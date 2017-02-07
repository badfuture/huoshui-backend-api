module.exports = {
  'GET /courses': {
    model: "course",
    controller: "CourseController",
    action: "find"
  },
  'GET /courses/:id': {
    model: "course",
    controller: "CourseController",
    action: "findOne"
  }
}
