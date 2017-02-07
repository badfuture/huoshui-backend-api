module.exports = {
  'GET /electives': {
    model: "elective",
    controller: "ElectiveController",
    action: "find"
  },
  'GET /electives/:id': {
    model: "elective",
    controller: "ElectiveController",
    action: "findOne"
  }
}
