module.exports = {
  'GET /courses': {
    model: "course",
    controller: "CourseController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /courses/:id': {
    model: "course",
    controller: "CourseController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
