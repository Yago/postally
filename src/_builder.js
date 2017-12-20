const path = require('path');
const fs = require('fs-extra');
const Twig = require('twig');
const sass = require('node-sass');
const Inky = require('inky').Inky;
const inlineCss = require('inline-css');

const workingFiles = require('../config.json').workingFiles;
const postallyHTML = require('./templates/html.js');
const postallySASS = require('./templates/sass.js');

module.exports = async (currentPath, done) => {
  workingFiles.forEach((file) => {
    if (!fs.pathExistsSync(file)) done('red', `Missing ${file} !`);
  });

  const filePath = (name) => path.resolve(currentPath, name);
  const data = fs.readJsonSync(filePath('data.json'));
  const markup = fs.readFileSync(filePath('index.html'), 'utf8');
  const variables = fs.readFileSync(filePath('variables.scss'), 'utf8');
  const styles = fs.readFileSync(filePath('styles.scss'), 'utf8');

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

  const target = path.resolve(currentPath, 'build/index.html');
  fs.outputFileSync(target, sanitizedBody);

  done('green', '👍  Successfully builded');
};