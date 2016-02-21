#!/usr/bin/env node
/**
 * Node script passed to Nodemon which handles interaction with Docker-compose
 * process.
 */

'use strict';

var argv = require( '../lib/cli' );
var compose = require( '../lib/compose' );

switch ( argv.method ) {
  case 'rebuild':
    compose( 'down' )
    .then( compose.then( 'build' ) )
    .then( compose.then( 'up' ) )
    ;
    break;

  case 'restart':
    compose( 'up' )
    .then( compose.then( 'restart' ) )
    .then( compose.then( 'logs' ) )
    ;
    break;

  default:
    process.stderr.write( 'error: no compose method detected!\n' );
    process.exit( 1 );
}
