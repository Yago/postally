#! /usr/bin/env node
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');

const argv = require('yargs')
  .help('h')
  .alias('h', 'help')
  .command('init', 'Init project')
  .command('start', 'Start project')
  .command('build', 'Build project')
  .usage('Usage: $0')
  .argv;

const init = require('./src/init');
const start = require('./src/start');
const build = require('./src/build');

const postally = {
  init,
  start,
  build,
};

const launch = () => {
  spinner.start();
  postally[argv._[0]](argv._, (color, msg) => {
    console.log(chalk[color](msg));
    spinner.stop(true);
  });
};

launch();