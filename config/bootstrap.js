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
var csv_parse = require('csv-parse/lib/sync');


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
  file_elective = "elective.json";
  file_prof = "prof.csv";

  file_user = "_User.json";
  file_course = "Courses.json";
  file_review = "Reviews.json";

  //common data
  var positionData = JSON.parse(fs.readFileSync(path_common + file_position));
  var schoolData = JSON.parse(fs.readFileSync(path_common + file_school));
  var deptData = schoolData[0].depts;
  var tagData = JSON.parse(fs.readFileSync(path_common + file_tag));
  var electiveData = JSON.parse(fs.readFileSync(path_common + file_elective));
  var profData = fs.readFileSync(path_common + file_prof);
  var profData = csv_parse(profData, {columns: true});
  profData.splice(0, 2);
  //profData = [profData[2]];


  //leancloud Data
  var userData = JSON.parse(fs.readFileSync(path_leancloud + file_user));
  var courseData = JSON.parse(fs.readFileSync(path_leancloud + file_course));
  var reviewData = JSON.parse(fs.readFileSync(path_leancloud + file_review));

  var seedSchools = function(next) {
    sails.log.debug("seeding schools");
    School.create(schoolData).then(function(results){
      sails.log.info("seeded: school");
      next(); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: school");
      next(); return null;
    });
  };

  var seedDepts = function(next) {
    sails.log.debug("seeding dept");
    async.eachSeries(deptData, function(entry, next){
      var dept = {};
      var prepDept = function(next) {
        dept.shortname = entry.shortname;
        dept.longname = entry.longname;
        next();
      };
      var insertSchool = function(next){
        School.findOne({"name": "西南交通大学"}).exec(function(err, school){
          if (err) sails.log.error("error", err);
          dept.school = school.id;
          next();
        });
      };
      var saveDept = function(next){
        Dept.create(dept).exec(function(err, results){
          if (err) sails.log.error("error", err);
          next();
        });
      };
      async.waterfall([prepDept, insertSchool, saveDept]);
      next();
    }, function (err) {
      if (err) sails.log.error("error", err);
      sails.log.info("seeded: depts");
      next();
    });
  };

  var seedPositions = function(next) {
    sails.log.debug("seeding positions");
    Position.create(positionData).then(function(results){
      sails.log.info("seeded: position");
      next(); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: position");
      next(); return null;
    });
  };

  var seedTags = function (next) {
    sails.log.debug("seeding tags");
    Tag.create(tagData).then(function(results){
      sails.log.info("seeded: tag");
      next(); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: tag");
      sails.log.error("error", err);
      next(); return null;
    });
  };


  var seedUsers = function(next) {
    sails.log.debug("seeding users");
    async.eachSeries(userData.results, function(entry, next){
      var user = {};
      var prepUser = function(next) {
        user.username = entry.username;
        user.password = entry.password;
        user.salt = entry.salt;
        user.email = entry.email;
        user.firstYear = entry.year;
        next();
      };
      var insertSchool = function(next){
        School.findOne({"name": "西南交通大学"}).exec(function(err, school){
          if (err) sails.log.error("error", err);
          user.school = school.id;
          next();
        });
      };
      var insertDept = function(next) {
        Dept.findOne({"shortname": entry.dept}).exec(function(err, results){
          if (err) sails.log.error("error", err);
          user.dept = results.id;
          next();
        });
      };
      var saveUser = function(next) {
        User.create(user).exec(function(err, results){
          if (err) sails.log.error("error", err);
          next();
        });
      };
      async.waterfall([prepUser, insertSchool, insertDept, saveUser]);
      next();
    }, function (err) {
      if (err) sails.log.error("error", err);
      sails.log.info("seeded: user");
      next();
    });
  };

  var seedElective = function (next) {
    sails.log.debug("seeding elective");
    Elective.create(electiveData).then(function(results){
      sails.log.info("seeded: elective");
      next(); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: elective");
      next(); return null;
    });
  };

  //code,name,gender,position,dept,school,email,phone,birth,hometown,exp,group,motto,intro,legacy_courses,achievement,research,link
  var seedProfs = function(next) {
    sails.log.debug("seeding profs");
    async.eachSeries(profData, function(entry, next){
      var prof = {};
      var prepProf = function(next) {
        prof.code = entry.code;
        prof.name = entry.name;
        if (entry.gender == "男") {
          prof.gender = "male";
        } else if (entry.gender == "女") {
          prof.gender = "female";
        }
        prof.email = entry.email;
        prof.phone = entry.phone;
        if (entry.birth && !isNaN(parseFloat(entry.birth))
            && entry.brith > 1930 && entry.birth < 2010 ) {
          prof.birth = entry.birth;
        }
        prof.hometown = entry.hometown;
        if (entry.exp && !isNaN(parseFloat(entry.exp))) {
          prof.exp = entry.exp;
        }
        prof.group = entry.group;
        prof.intro = entry.intro;
        prof.education = entry.education;
        prof.research = entry.research;
        prof.achievement = entry.achievement;
        prof.legacyCourses = entry.legacyCourses;
        next();
      };
      var insertSchool = function(next){
        School.findOne({"name": entry.school}).exec(function(err, results){
          if (err) sails.log.error("error", err);
          prof.school = results.id;
          next();
        });
      };
      var insertDept = function(next) {
        Dept.findOne({"longname": entry.dept}).exec(function(err, results){
          if (err) sails.log.error("error", err);
          if (results) {
            prof.dept = results.id;
          } else {
            prof.dept = null;
          }
          next();
        });
      };
      var insertPosition = function(next) {
        Position.findOne({"name": entry.position}).exec(function(err, results){
          if (err) sails.log.error("error", err);
          if (results) {
            prof.position = results.id;
          } else {
            prof.position = null;
          }
          next();
        });
      };
      var saveProf = function(next) {
        Prof.create(prof).exec(function(err, results){
          if (err) {
            sails.log.error("error", err);
          }
          next();
        });
      };
      //async.waterfall([prepProf,saveProf]);
      async.waterfall([prepProf, insertSchool, insertDept, insertPosition, saveProf]);
      next();
    }, function (err) {
      if (err) sails.log.error("error", err);
      sails.log.info("seeded: prof");
      next();
    });
  };


/*
  prof
  course
  courseStat
  review
*/

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
      seedElective,
      seedTags,
      seedUsers,
      seedProfs,
    ], function(err) {
      if (err) sails.log.error("error", err);
      sails.log.debug("seeding compeleted");
    });
  }
  seedDB();
  // must call this, otherwise won't return
  cb();
};
