#!/usr/bin/env node
/**
 * Exposed Node script to spawn Nodemon process.
 */

'use strict';

var argv = require( '../lib/cli' );
var compose = require( '../lib/compose' );
var nodemon = require( 'nodemon' );
var path = require( 'path' );

function kill( code ) {
  process.stdout.write( '\n' );
  process.exit( code || 0 );
}

// nodemon options object
var options = {
  args: [],
  script: path.resolve( path.join( __dirname, '..', 'bin', 'compose.js' ) )
};

// add nodemon args
if ( argv.ext ) {
  options.ext = argv.ext;
}
if ( argv.verbose ) {
  options.verbose = argv.verbose;
}
if ( argv.watch ) {
  options.watch = argv.watch;
}

// add docker-compose args (for compose script)
if ( argv.file ) {
  options.args.push( '--file' );
  options.args.push( argv.file );
}
if ( argv.projectName ) {
  options.args.push( '--project-name' );
  options.args.push( argv.projectName );
}

// // add -- args (for docker-compose pass-thru)
// if ( argv._.length ) {
//   options.args.push( '--' );
//   options.args = options.args.concat( argv._ );
// }

nodemon( options );
console.log( 'composemon:  nodemon.config:', nodemon.config );

nodemon.on( 'crash', kill );
process.on( 'SIGINT', function () {
  compose( 'stop', '--timeout', '0' )
  .then( compose.then( 'rm', '--force' ) )
  .then( kill )
  .catch( kill )
  ;
} );
