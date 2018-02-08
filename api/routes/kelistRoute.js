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
  'POST /kelists': {
    model: "kelist",
    controller: "KelistController",
    action: "create",
    isPlural: true,
    swagger: {}
  },
}
