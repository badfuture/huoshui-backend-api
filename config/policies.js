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
  AuthController: {
    '*': true
  },
  AuthQQController: {
    '*': true
  },
  AuthWeiboController: {
    '*': true
  },
  AuthGithubController: {
    '*': true
  },
  FeedbackController: {
    'find': true,
    'findOne': true,
    'create': true,
    '*': false
  },
  CommentController: {
    'find': true,
    'findOne': true,
    'create': true,
    '*': false
  },
  CourseController: {
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
    'create': ['isAuthorized'],
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
    'uploadAvatar': ['isAuthorized'],
    'likeCourse': ['isAuthorized'],
    'unlikeCourse': ['isAuthorized'],
    'likeProf': ['isAuthorized'],
    'unlikeProf': ['isAuthorized'],
    '*': false
  },
  SearchController: {
    'find': true,
    '*': false
  },
  StatController: {
    'getGlobalStat': true,
    '*': false
  },
  JobController: {
    'startCourseJobs': true,
    'startProfJobs': true,
    'removeAllJobs': true,
    '*': false
  },
  DataValidateController: {
    '*': true
  },
};
