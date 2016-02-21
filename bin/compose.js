#!/usr/bin/env node
/**
 * Node script passed to Nodemon which handles interaction with Docker-compose
 * process.
 */

'use strict';

var argv = require( '../lib/cli' );
var compose = require( '../lib/compose' );
var logger = require( '../lib/logger' );

function kill( code ) {
  logger.error( 'error encountered running docker-compose!' );
  logger.debug( 'docker-compose exit code: %s', code );
  process.exit( code || 0 );
}

if ( argv.rebuild ) {
  compose( 'stop', '--timeout', '0' )
  .then( compose.then( 'rm', '--force' ) )
  .then( compose.then( 'build' ) )
  .then( compose.then( 'up' ) )
  .catch( kill )
  ;

} else {
  compose( 'up', '-d' )
  .then( compose.then( 'restart' ) )
  .then( compose.then( 'logs' ) )
  .catch( kill )
  ;
}
