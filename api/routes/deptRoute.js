module.exports = {
  'GET /depts': {
    model: "dept",
    controller: "DeptController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /depts/:id': {
    model: "dept",
    controller: "DeptController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
