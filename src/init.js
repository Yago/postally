const path = require('path');
const fs = require('fs-extra');

module.exports = async (args, done) => {
  let target = path.resolve('.')
  if (args[1]) target = path.resolve(args[1]);
  
  const exist = fs.pathExistsSync(target);

  const empty = exist ? fs.readdirSync(target).length <= 0 : true;
  if (!empty) done('red', '⚠️  Directory is not empty');

  if (!exist) fs.ensureDirSync(target);

  const templates = path.resolve(__dirname, '../templates/');
  fs.copySync(templates, target);

  done('green', 'Success !');
};