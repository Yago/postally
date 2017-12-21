#! /usr/bin/env node
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');

// Define CLI
const argv = require('yargs')
  .help('h')
  .alias('h', 'help')
  .command('init', 'Bootstrap new project in defined (or not) directory')
  .command('start', 'Start the development server and the auto-rebuild')
  .command('build', 'Build project once')
  .usage('Usage: $0 [cmd] [optional init directory]')
  .argv;

// Get and set postally methods
const init = require('./src/init');
const start = require('./src/start');
const build = require('./src/build');
const postally = {
  init,
  start,
  build,
};

// Set postally methods interface
const launch = () => {
  if (!postally[argv._[0]]) {
    console.log(chalk.red('⚠️  Unknown command !'));
    return false;
  }

  if (argv._[0] !== 'start') {
    spinner.start();
    postally[argv._[0]](argv._, (color, msg) => {
      console.log(chalk[color](`\n${msg}`));
      spinner.stop(true);
    });
  } else {
    postally.start();
  }
};

launch();