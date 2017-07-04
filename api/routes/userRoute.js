
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
  }
}
