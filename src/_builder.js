const path = require('path');
const fs = require('fs-extra');
const Twig = require('twig');
const sass = require('node-sass');
const Inky = require('inky').Inky;
const inlineCss = require('inline-css');

// Get builder resources
const workingFiles = require('../config.json').workingFiles;
const postallyHTML = require('./templates/html.js');
const postallySASS = require('./templates/sass.js');

module.exports = async (currentPath, done) => {
  workingFiles.forEach((file) => {
    if (!fs.pathExistsSync(file)) done('red', `Missing ${file} !`);
  });

  // Load project's data, markup and styles
  const fixPath = (name) => path.resolve(currentPath, name);
  const data = fs.readJsonSync(fixPath('data.json'));
  const markup = fs.readFileSync(fixPath('index.html'), 'utf8');
  const variables = fs.readFileSync(fixPath('variables.scss'), 'utf8');
  const styles = fs.readFileSync(fixPath('styles.scss'), 'utf8');

  // Build CSS from Foundation for Email
  const css = await new Promise((resolve, reject) => {
    return sass.render({
      data: postallySASS(variables, styles),
      outputStyle: 'compressed'
    }, (error, result) => {
      if (error) console.log(error);
      resolve(result.css.toString());
    });
  });

  // Create Email HTML using Twig, Inky and Zurb inline CSS
  const html = Twig.twig({data: postallyHTML(markup, css)}).render(data);
  const body = new Inky({}).releaseTheKraken(html);
  const sanitizedBody = await new Promise((resolve, reject) => {
    return inlineCss(body, { url: '/' }).then(html => resolve(html));
  });

  // Add compiled markup and images into build directory
  const targetDir = path.resolve(currentPath, 'build/');
  const targetFile = `${targetDir}/index.html`;
  fs.outputFileSync(targetFile, sanitizedBody);
  
  fs.readdir(fixPath('images/'), (err, files) => {
    files.forEach((file) => {
      fs.copySync(fixPath(`images/${file}`), `${targetDir}/${file}`);
    });
  });

  done('green', '👍  Successfully builded');
};