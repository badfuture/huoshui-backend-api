
module.exports = {
  // get user info
  'GET /users': {
    model: "user",
    controller: "UserController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /users/:id': {
    model: "user",
    controller: "UserController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  },
  // upload avatar
  'POST /user/avatar': {
    model: "user",
    controller: "UserController",
    action: "uploadAvatar",
    isPlural: false,
    swagger: {}
  },
  // like and unlike course
  'PUT /users/:userId/liked_courses': {
    model: "user",
    controller: "UserController",
    action: "likeCourse",
  },
  'DELETE /users/:userId/liked_courses/:courseId': {
    model: "user",
    controller: "UserController",
    action: "unlikeCourse",
  },

  // like and unlike prof
  'PUT /users/:userId/liked_profs': {
    model: "user",
    controller: "UserController",
    action: "likeProf",
  },
  'DELETE /users/:userId/liked_profs/:profId': {
    model: "user",
    controller: "UserController",
    action: "unlikeProf",
  },
}
