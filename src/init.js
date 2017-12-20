const path = require('path');
const fs = require('fs-extra');

module.exports = (args, done) => {
  let target = path.resolve('.')
  if (args[1]) target = path.resolve(args[1]);

  console.log(target);

  done();
};