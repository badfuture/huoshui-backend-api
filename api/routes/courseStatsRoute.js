module.exports = {
  'GET /coursestats': {
    model: "coursestat",
    controller: "CourseStatController",
    action: "find"
  },
  'GET /coursestats/:id': {
    model: "coursestat",
    controller: "CourseStatController",
    action: "findOne"
  }
}
