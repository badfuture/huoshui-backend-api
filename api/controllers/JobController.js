module.exports = {
  startCourseJobs: (req, res) => {
    setTimeout(JobService.updateCourseStats, 1 * 1000)
    res.ok("course jobs started")
  },

  startProfJobs: (req, res) => {
    setTimeout(JobService.updateProfStats, 1 * 1000)
    res.ok("prof jobs started")
  },

  removeAllJobs: (req, res) => {
    setTimeout(JobService.removeAllJobs, 1 * 1000)
    res.ok("all jobs removed")
  },
};
