#!/usr/bin/env node

'use strict';

var argv = require( '../lib/cli' );
var compose = require( '../lib/compose' );

switch ( argv.method ) {
  case 'rebuild':
    compose( 'down' )
    .then( function () {
      return compose( 'build' );
    } )
    .then( function () {
      return compose( 'up' );
    } );
    break;

  case 'restart':
    compose( 'up' )
    .then( function () {
      return compose( 'restart' );
    } )
    .then( function () {
      return compose( 'logs' );
    } );
    break;

  default:
    process.stderr.write( 'error: no compose method detected!\n' );
    process.exit( 1 );
}
