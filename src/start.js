const chokidar = require('chokidar');
const path = require('path');
const chalk = require('chalk');
const browserSync = require('browser-sync');
const builder = require('./_builder');
const workingFiles = require('../config.json').workingFiles;

module.exports = (args, done) => {
  const currentPath = path.resolve('.');

  // Set web server
  browserSync.init({
    server: {
      baseDir: `${currentPath}/build`,
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: 0,
        borderBottomLeftRadius: 0,
      }
    },
    open: true
  });

  // Set the recuring build task
  const rebuild = (path) => {
    builder(currentPath, (...arguments) => {
      const d = new Date();
      console.log(
        `[${chalk.cyan(d.getHours())}:${chalk.cyan(d.getMinutes())}:${chalk.cyan(d.getSeconds())}]`,
        chalk.green(arguments[1])
      );
      browserSync.reload();
    });
  };

  // Watch working files and trigger rebuild
  chokidar
    .watch([...workingFiles, 'index*.html'])
    .on('add', path => rebuild(path))
    .on('change', path => rebuild(path));
};