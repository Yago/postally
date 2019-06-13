const path = require('path');
const fs = require('fs-extra');
const npm = require('npm-programmatic');

module.exports = (args, done) => {
  // Set target directory
  let target = path.resolve('.');
  if (args[1]) target = path.resolve(args[1]);

  // Test if it extits and if it's empty
  const exist = fs.pathExistsSync(target);
  const empty = exist ? fs.readdirSync(target).length <= 0 : true;
  if (!empty) done('red', `⚠️  ${target} is not empty`);

  if (!exist) fs.ensureDirSync(target);

  // Copy templates files into target and npm install
  if (empty) {
    const templates = path.resolve(__dirname, '../templates/');
    fs.copySync(templates, target);
    npm
      .install(['foundation-emails'], {
        cwd: target,
        save: true,
      })
      .then(() => {
        done('green', 'Init success !');
      });
  }
};
