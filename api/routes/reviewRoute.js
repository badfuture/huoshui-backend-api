module.exports = {
  'POST /reviews': {
    model: "review",
    controller: "ReviewController",
    action: "create",
    isPlural: false,
    swagger: {}
  },
  'GET /reviews': {
    model: "review",
    controller: "ReviewController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /reviews/:id': {
    model: "review",
    controller: "ReviewController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
