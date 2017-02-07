module.exports = {
  'GET /positions': {
    model: "position",
    controller: "PositionController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /positions/:id': {
    model: "position",
    controller: "PositionController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
