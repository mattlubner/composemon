'use strict';

/**
 * The Yargs.argv export, configured with Composemon's cli options.
 */
module.exports = require( 'yargs' )
.usage( 'Usage: $0 [options] [-- docker-compose arguments]' )
.option( 'ext', {
  describe: 'File extensions to watch for changes in'
} )
.alias( 'ext', 'e' )
.help( 'help' )
.alias( 'help', 'h' )
.option( 'r', {
  describe: 'Rebuild Dockerfile before restarting',
  type: 'boolean',
  alias: 'rebuild'
} )
.version( function () {
  return require( '../package.json' ).version;
} )
.argv;
