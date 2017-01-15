/**
 * Route Mappings
 */

module.exports.routes = {

  //seed leancloud data
  'POST /seeddb': 'SeedController.seedDB',

  //authorization
  'POST /auth/signup': {
    model: "",
    controller: "AuthController",
    action: "signup"
  },
  'POST /auth/login': {
    model: "",
    controller: "AuthController",
    action: "login"
  },

  //course
  'GET /comments': {
    model: "comment",
    controller: "CommentController",
    action: "find"
  },
  'GET /comments/:id': {
    model: "comment",
    controller: "CommentController",
    action: "findOne"
  },

  //course
  'GET /courses': {
    model: "course",
    controller: "CourseController",
    action: "find"
  },
  'GET /courses/:id': {
    model: "course",
    controller: "CourseController",
    action: "findOne"
  },

  //courseStat
  'GET /coursestats': {
    model: "coursestat",
    controller: "CourseStatController",
    action: "find"
  },
  'GET /coursestats/:id': {
    model: "coursestat",
    controller: "CourseStatController",
    action: "findOne"
  },

  //dept
  'GET /depts': {
    model: "dept",
    controller: "DeptController",
    action: "find"
  },
  'GET /depts/:id': {
    model: "dept",
    controller: "DeptController",
    action: "findOne"
  },

  //elective
  'GET /electives': {
    model: "elective",
    controller: "ElectiveController",
    action: "find"
  },
  'GET /electives/:id': {
    model: "elective",
    controller: "ElectiveController",
    action: "findOne"
  },

  //position
  'GET /positions': {
    model: "position",
    controller: "PositionController",
    action: "find"
  },
  'GET /positions/:id': {
    model: "position",
    controller: "PositionController",
    action: "findOne"
  },

  //prof
  'GET /profs': {
    model: "prof",
    controller: "ProfController",
    action: "find"
  },
  'GET /profs/:id': {
    model: "prof",
    controller: "ProfController",
    action: "findOne"
  },

  //review
  'GET /reviews': {
    model: "review",
    controller: "ReviewController",
    action: "find"
  },
  'GET /reviews/:id': {
    model: "review",
    controller: "ReviewController",
    action: "findOne"
  },

  //school
  'GET /schools': {
    model: "school",
    controller: "SchoolController",
    action: "find"
  },
  'GET /schools/:id': {
    model: "school",
    controller: "SchoolController",
    action: "findOne"
  },

  //tag
  'GET /tags': {
    model: "tag",
    controller: "TagController",
    action: "find"
  },
  'GET /tags/:id': {
    model: "tag",
    controller: "TagController",
    action: "findOne"
  },

  //user
  'GET /users': {
    model: "user",
    controller: "UserController",
    action: "find"
  },
  'GET /users/:id': {
    model: "user",
    controller: "UserController",
    action: "findOne"
  },
};
