module.exports = {

  startJobs: (req, res) => {
    setTimeout(JobService.updateCourseStats, 1.0 * 60 * 1000) // start in 1.0 mins
    setTimeout(JobService.updateProfStats, 2.0 * 60 * 1000) // start in 2.0 mins
    res.ok("jobs started")
  },
};
