/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 */

const Promise = require('sequelize').Promise;

module.exports.bootstrap = function(cb) {

  //bluebird promises
  Promise.config({
      warnings: false,
  });

  //need this otherwise won't return
  cb();
};
