/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */


module.exports.policies = {

  //remember to enable this for jwt
  //'*': ['isAuthorized'], // Everything resctricted by default
  AuthController: {
    '*': true
  },
  CommentController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  CourseController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  CourseStatController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  DeptController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  PositionController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  ProfController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  ReviewController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  SchoolController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  SeedController: {
    '*': true
  },
  TagController: {
    'find': true,
    'findOne': true,
    '*': false
  },
  UserController: {
    'find': true,
    'findOne': true,
    '*': false
  },
};
