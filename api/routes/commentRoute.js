module.exports = {
  'GET /comments': {
    model: "comment",
    controller: "CommentController",
    action: "find"
  },
  'GET /comments/:id': {
    model: "comment",
    controller: "CommentController",
    action: "findOne"
  },
  'POST /comments': {
    model: "comment",
    controller: "CommentController",
    action: "create"
  }
}
