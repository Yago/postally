const path = require('path');
const builder = require('./_builder');

// Will start the builder once
module.exports = (args, done) => {
  const currentPath = path.resolve('.');
  builder(currentPath, (...arguments) => {
    done(...arguments);
  });
};