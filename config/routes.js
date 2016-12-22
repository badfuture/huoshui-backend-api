/**
 * Route Mappings
 */

module.exports.routes = {
  '/': {view: 'homepage'},

  //seed leancloud data
  'post /seeddb': 'SeedController.seedDB',

  //authorization
  'post /auth/signup': 'AuthController.signup',
  'post /auth/login': 'AuthController.login',

  //user
  'get /users': 'UserController.find',
  'get /users/:id': 'UserController.findOne',

  //school
  'post /schools': 'SchoolController.create',

};
