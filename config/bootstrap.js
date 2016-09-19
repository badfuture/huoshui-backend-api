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
var async = require("async");

module.exports.bootstrap = function(cb) {

  //skip seeding if production mode
  if (sails.config.environment === 'production') {
    return cb();
  }

  //seed data if dev mode
  path_common = sails.config.appPath + "/migration/data_common/";
  path_leancloud = sails.config.appPath + "/migration/data_leancloud/";

  file_position = "position.json";
  file_school = "school.json";
  file_tag = "tag.json";

  file_user = "_User.json";
  file_course = "Courses.json";
  file_review = "Reviews.json";

  //common data
  var positionData = JSON.parse(fs.readFileSync(path_common + file_position));
  var schoolData = JSON.parse(fs.readFileSync(path_common + file_school));
  var deptData = schoolData[0].depts;
  var tagData = JSON.parse(fs.readFileSync(path_common + file_tag));

  //leancloud Data
  var userData = JSON.parse(fs.readFileSync(path_leancloud + file_user));



  var seedPositions = function(callback) {
    sails.log.debug("seeding positions");
    Position.create(positionData).then(function(results){
      sails.log.info("seeded: position");
      callback(null); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: position");
      callback(null); return null;
    });
  };

  var seedSchools = function(callback) {
    sails.log.debug("seeding schools");
    School.create(schoolData).then(function(results){
      sails.log.info("seeded: school");
      callback(null); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: school");
      callback(null); return null;
    });
  };

  var seedDepts = function(callback) {
    sails.log.debug("seeding dept");
    async.eachSeries(deptData, function(entry, callback){
      var dept = {};
      var prepDept = function(callback) {
        dept.shortname = entry.shortname;
        dept.longname = entry.longname;
        callback(null);
      };
      var insertSchool = function(callback){
        School.findOne({"name": "西南交通大学"}).exec(function(err, school){
          dept.school = school.id;
          callback(null);
        });
      };
      var saveDept = function(callback){
        Dept.create(dept).exec(function(err, results){
          callback(null);
        });
      };
      async.waterfall([prepDept, insertSchool, saveDept]);
      callback(null);
    }, function (err) {
      sails.log.info("seeded: depts");
      setTimeout(function(){
        callback(null);
      }, 5000);
    });
  };



  var seedTags = function (callback) {
    sails.log.debug("seeding tags");
    Tag.create(tagData).then(function(results){
      sails.log.info("seeded: tag");
      callback(null); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: tag");
      callback(null); return null;
    });
  };


  var seedUsers = function(callback) {
    sails.log.debug("seeding users");
    async.eachSeries(userData.results, function(entry, callback){
      var user = {};
      var prepUser = function(callback) {
        user.username = entry.username;
        user.password = entry.password;
        user.salt = entry.salt;
        user.email = entry.email;
        user.firstYear = entry.year;
        callback(null);
      };
      var insertSchool = function(callback){
        School.findOne({"name": "西南交通大学"}).exec(function(err, school){
          user.school = school.id;
          callback(null);
        });
      };
      var insertDept = function(callback) {
        Dept.findOne({"shortname": entry.dept}).exec(function(err, results){
          user.dept = results.id;
          callback(null);
        });
      };
      var saveUser = function(callback) {
        User.create(user).exec(function(err, results){
          callback(null);
        });
      };
      async.waterfall([prepUser, insertSchool, insertDept, saveUser]);
      callback(null);
    }, function (err) {
      sails.log.info("seeded: user");
      callback(null);
    });
  };



/*

  var courseData = JSON.parse(fs.readFileSync(path_leancloud + file_course));
  var courseDataParsed = [];
  courseData.results.forEach(function(entry, index, arr) {
    var course = {};

  });
  Course.create(courseDataParsed).exec(function(err, results){
    console.log("seeded: course");
  });
*/
  var seedDB = function() {
    async.series([
      seedSchools,
      seedDepts,
      seedPositions,
      seedTags,
      seedUsers,
    ], function(err) {
      sails.log.info("seeding compeleted");
    });
  }
  seedDB();

  // must call this, otherwise won't return
  cb();
};
