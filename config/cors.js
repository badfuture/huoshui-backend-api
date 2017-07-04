/**
 * Cross-Origin Resource Sharing (CORS) Settings
 * (sails.config.cors)
 */

module.exports.cors = {

  // enable cors on all routes
  allRoutes: true,

  // allow cors for all origins
  origin: '*',

  // disallow cookies to be shared for cors requests
  credentials: false,

  /***************************************************************************
  *                                                                          *
  * Which methods should be allowed for CORS requests? This is only used in  *
  * response to preflight requests (see article linked above for more info)  *
  *                                                                          *
  ***************************************************************************/

  // methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',

  /***************************************************************************
  *                                                                          *
  * Which headers should be allowed for CORS requests? This is only used in  *
  * response to preflight requests.                                          *
  *                                                                          *
  ***************************************************************************/

  headers: 'content-type, authorization'

};
