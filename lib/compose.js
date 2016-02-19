'use strict';

var argv = require( './cli' );
var spawn = require( './spawn' );

module.exports = function ( method ) {
  return spawn( 'docker-compose', [ method ].concat( argv._ ) );
};
