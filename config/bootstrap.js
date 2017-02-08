/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 */

const Promise = require('sequelize').Promise;
var isDbSeeded = function() {
  School.findOne({where: {"name": "西南交通大学"}})
  .then(function(data){
    sails.isSeeded = (data) ? true : false;
  })
  .catch(function(err){
    console.log("bootstrap error");
  });
};

module.exports.bootstrap = function(cb) {

  //bluebird promises
  Promise.config({
      warnings: false,
  });

  if (!isDbSeeded()) {
    sails.isSeeded = false;
  } else {
    sails.isSeeded = true;
  }

  //need this otherwise won't return
  cb();
};
