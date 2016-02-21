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
};

module.exports = compose;
