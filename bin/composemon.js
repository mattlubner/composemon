#!/usr/bin/env node

'use strict';

var argv = require( '../lib/cli' );
var nodemon = require( 'nodemon' );
var path = require( 'path' );
var spawn = require( '../lib/spawn' );

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

process.on( 'SIGINT', function () {
  spawn( 'docker-compose', [ 'down' ].concat( argv._ ) )
  .then( kill )
  .catch( kill );
} );
