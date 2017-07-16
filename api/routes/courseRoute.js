module.exports = {
  'GET /courses': {
    model: "course",
    controller: "CourseController",
    action: "find",
    swagger: {
      enabled: true,
      config: {
        description:
          "## Find multiple courses\n" +
          "* Use 'populate=all' to populate all possible associations\n" +
          "* All course properties can aslo be queried as a param \n" +
          "## Quick Example\n" +
          "* find and paginate courses in a department:\n" +
          "[API call](https://api.huoshui.org/courses?populate=[Prof,School,Depts,Stat]&$Depts.shortname$=土木&sort=id+ASC&limit=50&skip=0)"
        ,
        summary: "Find multiple courses",
        operationId: "getCourses",
        responses: {
          "200": {
            "description": "An array of courses",
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
    swagger: {
      enabled: true,
      config: {
        summary: "Find a single course",
        description:
          "## Find a single course\n" +
          "* Use 'populate=all' to populate all possible associations\n" +
          "## Quick Example\n" +
          "* find a single course with all associations included:\n" +
          "[API call](https://api.huoshui.org/courses/4706?populate=all)"
        ,
        operationId: "getCourseByFind",
        paramList: ["id", "populate"],
        responses: {
          "200": {
            "description": "A Course Object",
            "schema": {
              "$ref": "#/definitions/course"
            }
          }
        }
      }
    }
  }
}
