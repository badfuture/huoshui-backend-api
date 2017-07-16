module.exports = {
  'GET /courses': {
    model: "course",
    controller: "CourseController",
    action: "find",
    swagger: {
      enabled: true,
      config: {
        description: "Get info for multiple courses<br>Use 'populate=all' to populate all possible associations<br>Although not shown here, all course properties can aslo be queried as a param",
        summary: "Get info for multiple courses",
        operationId: "getCourses",
        responses: {
          "200": {
            "description": "courses response",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/course"
              }
            }
          }
        },
        paramList: ["limit", "skip", "sort", "populate", "deptSubquery"]
      }
    }
  },
  'GET /courses/:id': {
    model: "course",
    controller: "CourseController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  }
}
