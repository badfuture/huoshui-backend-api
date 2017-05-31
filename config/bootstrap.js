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

  //initialize db seeding status
  if (!SeedService.isDbSeeded()) {
    sails.isSeeded = false;
  } else {
    sails.isSeeded = true;
  }

  //job queue service
  JobService.removeAllJobs();
  setTimeout(JobService.updateCourseStats, 10 * 60 * 1000); // start in 10 mins
  setTimeout(JobService.updateProfStats, 20 * 60 * 1000); // start in 20 mins

  done();
};
