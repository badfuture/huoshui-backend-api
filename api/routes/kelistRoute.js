module.exports = {
  'GET /kelists': {
    model: "kelist",
    controller: "KelistController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /kelists/:id': {
    model: "kelist",
    controller: "KelistController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  },
  'PATCH /kelists/:id': {
    model: "kelist",
    controller: "KelistController",
    action: "updateKelist",
    swagger: {}
  },
  'POST /kelists': {
    model: "kelist",
    controller: "KelistController",
    action: "create",
    isPlural: true,
    swagger: {}
  },
  'POST /kelists/:id': {
    model: "kelist",
    controller: "KelistController",
    action: "addToKelist",
    isPlural: false,
    swagger: {}
  },
  'DELETE /kelists/:id': {
    model: "kelist",
    controller: "KelistController",
    action: "deleteKelist",
    isPlural: false,
    swagger: {}
  },
  'DELETE /kelists/:id/courses/:courseId': {
    model: "kelist",
    controller: "KelistController",
    action: "removeFromKelist",
    isPlural: false,
    swagger: {}
  }
}
