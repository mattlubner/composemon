'use strict';

var Promise = require( 'bluebird' );
var spawn = require( 'child_process' ).spawn;

/**
 * Promisified version of child_process.spawn().
 *
 * @param  {String}   command
 * @param  {String[]} args
 * @return {Promise}
 */
module.exports = function ( command, args ) {
  return new Promise( function ( resolve, reject ) {
    command = command.trim();
    var options = { stdio: 'inherit' };
    console.log( 'composemon:  %s %s', command, args.join( ' ' ) );
    spawn( command, args, options )
    .on( 'exit', function ( code ) {
      if ( code ) {
        reject( code );
        return;
      }
      resolve();
    } );
  } );
};
