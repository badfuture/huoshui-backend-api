/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 */


module.exports.bootstrap = function(done) {

  //bluebird promises
  const Promise = require('sequelize').Promise;
  Promise.config({
      warnings: false,
  });

  //job queue service
  JobService.removeAllJobs();
  setTimeout(JobService.updateCourseStats, 0.5 * 60 * 1000); // start in 10 mins
  setTimeout(JobService.updateProfStats, 1.0 * 60 * 1000); // start in 20 mins

  done();
};
