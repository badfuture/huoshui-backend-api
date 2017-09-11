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

  done();
};
