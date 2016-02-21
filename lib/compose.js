'use strict';

var argv = require( './cli' );
var spawn = require( './spawn' );

/**
 * Run docker-compose commands via child_process.spawn(), using compose-
 * specific arguments passed from composemon.
 *
 * @example
 *   compose( 'compose-subcommand', 'argument1', 'argument2' )
 *   .then( ... );
 *
 * @return {Promise}
 */
function compose() {
  var composeArgs = [];
  if ( argv.file ) {
    composeArgs.push( '--file' );
    composeArgs.push( argv.file );
  }
  if ( argv.projectName ) {
    composeArgs.push( '--project-name' );
    composeArgs.push( argv.projectName );
  }
  composeArgs = composeArgs.concat( Array.prototype.slice.call( arguments ) );
  // composeArgs = composeArgs.concat( argv._ );
  return spawn( 'docker-compose', composeArgs );
}

/**
 * Syntactic sugar for chaining subsequent compose commands.
 *
 * @example  No syntactic sugar:
 *   compose( 'first', 'command' )
 *   .then( function () {
 *     return compose( 'next', 'command' );
 *   } );
 *
 * @example  With syntactic sugar:
 *   compose( 'first', 'command' )
 *   .then( compose.then( 'next', 'command' ) );
 *
 * @return {Promise}
 */
compose.then = function () {
  var args = Array.prototype.slice.call( arguments );
  return function () {
    return compose.apply( null, args );
  };
};

module.exports = compose;
