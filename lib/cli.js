'use strict';

/**
 * The Yargs.argv export, configured with Composemon's cli options.
 */
module.exports = require( 'yargs' )
.usage( 'Usage: $0 [OPTIONS]' )
.option( 'e', {
  describe: 'File extensions to watch for changes in',
  type: 'array',
  alias: 'ext'
} )
.option( 'f', {
  describe: 'Specify an alternate compose file',
  type: 'string',
  alias: 'file'
} )
.help( 'h' )
.alias( 'h', 'help' )
.option( 'i', {
  describe: 'Ignore specific files or directories',
  type: 'array',
  alias: 'ignore'
} )
.option( 'p', {
  describe: 'Specify an alternate project name',
  type: 'string',
  alias: 'project-name'
} )
.option( 'r', {
  describe: 'Rebuild Dockerfile before restarting',
  type: 'boolean',
  alias: 'rebuild'
} )
.alias( 'v', 'version' )
.version( function () {
  return require( '../package.json' ).version;
} )
.option( 'w', {
  describe: 'Directory or files to watch',
  type: 'array',
  alias: 'watch'
} )
.group( [ 'file', 'project-name' ], 'Docker-compose:' )
.group( [ 'ext', 'watch', 'ignore' ], 'Nodemon:' )
.argv;
