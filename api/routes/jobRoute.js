module.exports = {
  'PUT /jobs/prof': {
    controller: "JobController",
    action: "startProfJobs"
  },
  'PUT /jobs/course': {
    controller: "JobController",
    action: "startCourseJobs"
  },
  'Delete /jobs': {
    controller: "JobController",
    action: "removeAllJobs"
  }
}
