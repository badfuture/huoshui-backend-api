module.exports = {
  'GET /reviews': {
    model: "review",
    controller: "ReviewController",
    action: "find"
  },
  'GET /reviews/:id': {
    model: "review",
    controller: "ReviewController",
    action: "findOne"
  }
}
