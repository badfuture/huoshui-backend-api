module.exports = {
  'GET /positions': {
    model: "position",
    controller: "PositionController",
    action: "find",
    isPlural: true,
    swagger: {
      enabled: true,
      config: {
        description:
          "## Find multiple positions\n"
        ,
        summary: "Find multiple positions",
        operationId: "getPositions",
        responses: {
          "200": {
            "description": "An array of positions",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/position"
              }
            }
          }
        },
        paramList: ["limit", "skip", "sort"]
      }
    }
  },
  'GET /positions/:id': {
    model: "position",
    controller: "PositionController",
    action: "findOne",
    isPlural: false,
    swagger: {
      enabled: true,
      config: {
        summary: "Find a single position",
        description:
          "## Find a single position\n"
        ,
        operationId: "getPositionById",
        paramList: ["id"],
        responses: {
          "200": {
            "description": "A Position Object",
            "schema": {
              "$ref": "#/definitions/position"
            }
          }
        }
      }
    }
  }
}
