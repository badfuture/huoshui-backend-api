
module.exports = {
  'GET /users': {
    model: "user",
    controller: "UserController",
    action: "find"
  },
  'GET /users/:id': {
    model: "user",
    controller: "UserController",
    action: "findOne"
  }
}
