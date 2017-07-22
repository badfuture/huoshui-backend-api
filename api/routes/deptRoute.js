module.exports = {
  'GET /depts': {
    model: "dept",
    controller: "DeptController",
    action: "find",
    swagger: {
      enabled: true,
      config: {
        description:
          "## Find multiple depts\n" +
          "* All dept properties can aslo be queried as params \n"
        ,
        summary: "Find multiple depts",
        operationId: "getDepts",
        responses: {
          "200": {
            "description": "An array of depts",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/dept"
              }
            }
          }
        },
        paramList: ["limit", "skip", "sort"]
      }
    }
  },
  'GET /depts/:id': {
    model: "dept",
    controller: "DeptController",
    action: "findOne",
    swagger: {
      enabled: true,
      config: {
        summary: "Find a single dept",
        description:
          "## Find a single dept\n"
        ,
        operationId: "getDeptById",
        paramList: ["id"],
        responses: {
          "200": {
            "description": "A Dept Object",
            "schema": {
              "$ref": "#/definitions/dept"
            }
          }
        }
      }
    }
  }
}
