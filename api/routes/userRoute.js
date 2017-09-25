
module.exports = {
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
  'POST /user/avatar': {
    model: "user",
    controller: "UserController",
    action: "uploadAvatar",
    isPlural: false,
    swagger: {}
  },
  'PUT /users/:userId/liked-profs': {
    model: "user",
    controller: "UserController",
    action: "addLikedProf",
  },
  'PUT /users/:userId/liked-profs/:profId': {
    model: "user",
    controller: "UserController",
    action: "addLikedProf",
  },
  'DELETE /users/:userId/liked-profs/:profId': {
    model: "user",
    controller: "UserController",
    action: "deleteLikedProf",
  },
}
