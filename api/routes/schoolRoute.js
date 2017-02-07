module.exports = {
  'GET /schools': {
    model: "school",
    controller: "SchoolController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /schools/:id': {
    model: "school",
    controller: "SchoolController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
