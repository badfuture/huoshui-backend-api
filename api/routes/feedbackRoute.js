module.exports = {
  'GET /feedbacks': {
    model: "feedback",
    controller: "FeedbackController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /feedbacks/:id': {
    model: "feedback",
    controller: "FeedbackController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  },
  'POST /feedbacks': {
    model: "feedback",
    controller: "FeedbackController",
    action: "create"
  }
}
