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

var timeout = 3000; //wait 3s for db population

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
      setTimeout(function(){
        next();
      }, timeout);
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
      var saveProf = function(next) {
        Prof.create(prof).exec(function(err, results){
          if (err) {
            sails.log.error("error", err);
          }
          next();
        });
      };
      async.waterfall([prepProf, insertSchool, insertDept, saveProf]);
      next();
    }, function (err) {
      if (err) sails.log.error("error", err);
      sails.log.info("seeded: prof");
      setTimeout(function(){
        next();
      }, timeout);
    });
  };

  //must constant: name,
  //must relation: school,dept,prof,
  //optional: rate1,rate2,rate3,rateOverall,reviewGoodCount,attendanceCount,attendanceOverall,reviewCount,homeworkCount,homeworkOverall,examCount,birdOverall,birdCount,examOverall
  //not sure: tags, stats, reviews, followers
  var seedCourses = function(next) {
    sails.log.debug("seeding course");
    async.eachSeries(courseData.results, function(entry, next){
    //async.eachSeries([courseData.results[0]], function(entry, next){
      var course = {};
      var prepCourse = function(next) {
        course.name = entry.name;
        next();
      };
      var insertSchool = function(next){
        School.findOne({"name": entry.school}).exec(function(err, school){
          if (err) sails.log.error("error", err);
          course.school = school.id;
          next();
        });
      };
      var insertDept = function(next) {
        Dept.findOne({"shortname": entry.dept}).exec(function(err, results){
          if (err) sails.log.error("error", err);
          if (results) {
            course.dept = results.id;
          } else {
            course.dept = null;
          }
          next();
        });
      };
      var insertProf = function(next) {
        Prof.findOne({"name": entry.prof}).exec(function(err, results){
          if (err) sails.log.error("error", err);
          if (results) {
            course.prof = results.id;
            next();
          } else {
            //create prof if not found
            Prof.create({name: entry.prof, school: course.school}).then(function(results){
              return results;
            }).then(function(prof){
              course.prof = prof.id;
              next();
              return null;
            })
            .catch(function(err){
              next();
              return null;
            });
          }
        });
      };
      var saveCourse = function(next) {
        Course.create(course).exec(function(err, results){
          if (err) sails.log.error("error", err);
          next();
        });
      };
      async.waterfall([prepCourse, insertSchool, insertDept, insertProf, saveCourse]);
      next();
    }, function (err) {
      if (err) sails.log.error("error", err);
      sails.log.info("seeded: course");
      setTimeout(function(){
        next();
      }, timeout);
    });
  };



//review
/*
{
 "tags": [
   {
     "id": "4",
     "positive": true,
     "value": "氛围轻松",
     "checked": true
   },
   {
     "id": "8",
     "positive": true,
     "value": "幽默",
     "checked": true
   },
   {
     "id": "14",
     "positive": true,
     "value": "热情",
     "checked": true
   }
 ],
 "attendance": {
   "id": "4",
   "name": "多",
   "value": 4
 },
 "bird": {
   "id": "2",
   "name": "正常水平",
   "value": 2
 },
 "authorId": {
   "__type": "Pointer",
   "className": "_User",
   "objectId": "5699ca3f60b21c048738cc47"
 },
 "downVote": 0,
 "ACL": {
   "*": {
     "read": true,
     "write": true
   }
 },
 "upVote": 0,
 "profName": "甘霖",
 "exam": {
   "touched": true,
   "examprep": {
     "id": "0",
     "name": "划重点",
     "checked": false,
     "touched": false
   },
   "openbook": {
     "id": "1",
     "name": "开卷",
     "checked": true,
     "touched": true
   },
   "oldquestion": {
     "id": "2",
     "name": "原题",
     "checked": false,
     "touched": false
   },
   "easiness": {
     "id": "3",
     "name": "给分",
     "checked": false,
     "touched": true
   }
 },
 "comment": "既能学到东西，又能提起兴趣学，这门课我很少翘也很满意，教民族乐少一点",
 "homework": {
   "id": "1",
   "name": "无",
   "value": 1
 },
 "courseName": "音乐与人生",
 "courseId": {
   "__type": "Pointer",
   "className": "Courses",
   "objectId": "561da599e4b0d98abf28123e"
 },
 "rating": {
   "rate1": 5,
   "rate2": 5,
   "rate3": 5,
   "overall": 15
 },
 "objectId": "5699cbc160b2b80a9ea62dce",
 "createdAt": "2016-01-16T04:49:05.753Z",
 "updatedAt": "2016-09-25T13:48:03.624Z"
}

*/
/*
  courseStat
  review
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
      seedCourses,
    ], function(err) {
      if (err) sails.log.error("error", err);
      sails.log.debug("seeding compeleted");
    });
  }
  seedDB();
  // must call this, otherwise won't return
  cb();
};
