module.exports = {
  'GET /positions': {
    model: "position",
    controller: "PositionController",
    action: "find"
  },
  'GET /positions/:id': {
    model: "position",
    controller: "PositionController",
    action: "findOne"
  }
}
