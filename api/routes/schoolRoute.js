module.exports = {
  'GET /schools': {
    model: "school",
    controller: "SchoolController",
    action: "find",
    swagger: {
      enabled: true,
      config: {
        description:
          "## Find multiple schools\n" +
          "* All schools properties can aslo be queried as params \n"
        ,
        summary: "Find multiple schools",
        operationId: "getSchools",
        responses: {
          "200": {
            "description": "An array of schools",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/school"
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
  'GET /schools/:id': {
    model: "school",
    controller: "SchoolController",
    action: "findOne",
    swagger: {
      enabled: true,
      config: {
        summary: "Find a single school",
        description:
          "## Find a single school\n"
        ,
        operationId: "getSchoolById",
        paramList: [
          "id"
        ],
        responses: {
          "200": {
            "description": "A School Object",
            "schema": {
              "$ref": "#/definitions/school"
            }
          }
        }
      }
    }
  }
}
