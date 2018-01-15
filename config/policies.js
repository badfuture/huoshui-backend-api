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
  AuthLocalController: {
    'login': true,
    'signup': true,
    'blacklistToken': ['isAuthenticated'],
    '*': false,
  },
  AuthQQController: {
    '*': true
  },
  AuthWeiboController: {
    '*': true
  },
  FeedbackController: {
    'find': true,
    'findOne': true,
    'create': ['isAuthenticated'],
    '*': false,
  },
  CommentController: {
    'find': true,
    'findOne': true,
    'create': ['isAuthenticated'],
    '*': false,
  },
  CourseController: {
    'find': true,
    'findOne': true,
    '*': false,
  },
  DeptController: {
    'find': true,
    'findOne': true,
    '*': false,
  },
  PositionController: {
    'find': true,
    'findOne': true,
    '*': false,
  },
  ProfController: {
    'find': true,
    'findOne': true,
    '*': false,
  },
  ReviewController: {
    'find': true,
    'findOne': true,
    'create': ['isAuthenticated'],
    '*': false,
  },
  SchoolController: {
    'find': true,
    'findOne': true,
    '*': false,
  },
  SeedController: {
    'seedDB': true,
    'cleanDB': ['isAuthenticated'],
    '*': false,
  },
  TagController: {
    'find': true,
    'findOne': true,
    '*': false,
  },
  UserController: {
    'find': true,
    'findOne': true,
    'uploadAvatar': ['isAuthenticated'],
    'likeCourse': ['isAuthenticated'],
    'unlikeCourse': ['isAuthenticated'],
    'likeProf': ['isAuthenticated'],
    'unlikeProf': ['isAuthenticated'],
    '*': false,
  },
  SearchController: {
    'find': true,
    '*': false,
  },
  StatController: {
    'getGlobalStat': true,
    '*': false,
  },
  JobController: {
    'startCourseJobs': ['isAuthenticated','isAdmin'],
    'startProfJobs': ['isAuthenticated','isAdmin'],
    'removeAllJobs': ['isAuthenticated','isAdmin'],
    '*': false,
  },
  DataValidateController: {
    'checkReviewDuplicate': ['isAuthenticated','isAdmin'],
    '*': false,
  },
};
