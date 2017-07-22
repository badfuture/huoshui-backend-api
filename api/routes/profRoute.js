module.exports = {
  'GET /profs': {
    model: "prof",
    controller: "ProfController",
    action: "find",
    swagger: {
      enabled: true,
      config: {
        description:
          "## Find multiple profs\n" +
          "* Use 'populate=all' to populate all possible associations\n" +
          "* All profs properties can aslo be queried as params \n"
        ,
        summary: "Find multiple profs",
        operationId: "getProfs",
        responses: {
          "200": {
            "description": "An array of profs",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/prof"
              }
            }
          }
        },
        paramList: [
          "limit",
          "skip",
          "sort",
          {
            "name": "populate",
            "default": "Depts,School,Position,Tags,Stat"
          }
        ]
      }
    }
  },
  'GET /profs/:id': {
    model: "prof",
    controller: "ProfController",
    action: "findOne",
    swagger: {
      enabled: true,
      config: {
        summary: "Find a single prof",
        description:
          "## Find a single prof\n" +
          "* Use 'populate=all' to populate all possible associations\n"
        ,
        operationId: "getCourseById",
        paramList: [
          "id",
          {
            "name": "populate",
            "default": "Depts,School,Position,Tags,Stat"
          }
        ],
        responses: {
          "200": {
            "description": "A Prof Object",
            "schema": {
              "$ref": "#/definitions/prof"
            }
          }
        }
      }
    }
  }
}
