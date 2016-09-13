/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var fs = require("fs");

module.exports.bootstrap = function(cb) {

  //skip seeding if production mode
  if (sails.config.environment === 'production') {
    return cb();
  }

  //seed data if dev mode
  console.log("Test mode: seeding db ...");

  path_common = sails.config.appPath + "/migration/data_common/";

  var positionData = JSON.parse(fs.readFileSync(path_common + "position.json"));
  Position.create(positionData).exec(function(err, results){
    console.log("seeded: position");
  });

  var schoolData = JSON.parse(fs.readFileSync(path_common + "school.json"));
  School.create(schoolData).exec(function(err, results){
    console.log("seeded: school");
  });

  var tagData = JSON.parse(fs.readFileSync(path_common + "tag.json"));
  Tag.create(tagData).exec(function(err, results){
    console.log("seeded: tag");
  });










  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
