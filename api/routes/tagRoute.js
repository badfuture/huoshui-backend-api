module.exports = {
  'GET /tags': {
    model: "tag",
    controller: "TagController",
    action: "find"
  },
  'GET /tags/:id': {
    model: "tag",
    controller: "TagController",
    action: "findOne"
  }
}
