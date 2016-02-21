'use strict';

var log4js = require( 'log4js' );

log4js.configure( {
  appenders: [
    {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%c] %m %]'
      }
    }
  ]
} );

var logger = log4js.getLogger( 'composemon' );

logger.setLevel( 'WARN' );

module.exports = logger;
