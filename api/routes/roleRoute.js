module.exports = {
  'GET /roles': {
    model: "role",
    controller: "RoleController",
    action: "find",
  },
  'GET /roles/:id': {
    model: "role",
    controller: "RoleController",
    action: "findOne",
  }
}
