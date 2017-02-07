module.exports = {
  'GET /tags': {
    model: "tag",
    controller: "TagController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /tags/:id': {
    model: "tag",
    controller: "TagController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
