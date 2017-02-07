module.exports = {
  'GET /profs': {
    model: "prof",
    controller: "ProfController",
    action: "find"
  },
  'GET /profs/:id': {
    model: "prof",
    controller: "ProfController",
    action: "findOne"
  }
}
