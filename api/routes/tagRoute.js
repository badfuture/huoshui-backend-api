module.exports = {
  'GET /tags': {
    model: "tag",
    controller: "TagController",
    action: "find",
    swagger: {
      enabled: true,
      config: {
        description:
          "## Find multiple tags\n" +
          "* All tags properties can aslo be queried as params \n"
        ,
        summary: "Find multiple tags",
        operationId: "getTags",
        responses: {
          "200": {
            "description": "An array of tags",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/tag"
              }
            }
          }
        },
        paramList: [
          "limit",
          "skip",
          "sort"
        ]
      }
    }
  },
  'GET /tags/:id': {
    model: "tag",
    controller: "TagController",
    action: "findOne",
    swagger: {
      enabled: true,
      config: {
        summary: "Find a single tag",
        description:
          "## Find a single tag\n" +
          "* Use 'populate=all' to populate all possible associations\n"
        ,
        operationId: "getTagById",
        paramList: [
          "id"
        ],
        responses: {
          "200": {
            "description": "A Tag Object",
            "schema": {
              "$ref": "#/definitions/tag"
            }
          }
        }
      }
    }
  }
}
