module.exports = {
  'GET /feedback': {
    model: "feedback",
    controller: "FeedbackController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /feedback/:id': {
    model: "feedback",
    controller: "FeedbackController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
