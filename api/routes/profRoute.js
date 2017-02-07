module.exports = {
  'GET /profs': {
    model: "prof",
    controller: "ProfController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /profs/:id': {
    model: "prof",
    controller: "ProfController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
