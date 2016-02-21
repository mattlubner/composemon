'use strict';

/**
 * The Yargs.argv export, configured with Composemon's cli options.
 */
module.exports = require( 'yargs' )
.usage( 'Usage: $0 [options] [-- docker-compose arguments]' )
.option( 'method', {
  describe: 'Method of restarting containers on file changes',
  choices: [ 'restart', 'rebuild' ],
  default: 'restart'
} )
// .option( 'service', {
//   describe: 'Name of service to restart on file changes'
// } )
.option( 'ext', {
  describe: 'File extensions to watch for changes in'
} )
.alias( 'ext', 'e' )
.help( 'help' )
.alias( 'help', 'h' )
.version( function () {
  return require( '../package.json' ).version;
} )
.argv;
