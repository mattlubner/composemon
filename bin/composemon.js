#!/usr/bin/env node
/**
 * Exposed Node script to spawn Nodemon process.
 */

'use strict';

var argv = require( '../lib/cli' );
var compose = require( '../lib/compose' );
var nodemon = require( 'nodemon' );
var path = require( 'path' );

var nodemonCmd = [];
var nodemonScript = path.resolve( path.join( __dirname, 'compose.js' ) );

if ( argv.ext ) {
  nodemonCmd.push( '--ext' );
  nodemonCmd.push( argv.ext );
}

if ( argv.watch ) {
  nodemonCmd.push( '--watch' );
  nodemonCmd.push( argv.watch );
}

nodemonCmd.push( nodemonScript );
nodemonCmd = nodemonCmd.concat( process.argv.slice( 2 ) ).join( ' ' );
nodemon( nodemonCmd );

function kill( code ) {
  process.stdout.write( '\n' );
  process.exit( code || 0 );
}

nodemon.on( 'crash', kill );
process.on( 'SIGINT', function () {
  compose( 'stop', '--timeout', '0' )
  .then( compose.then( 'rm', '--force' ) )
  .then( kill )
  .catch( kill )
  ;
} );
