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

var timeout = 10000; //wait 3s for db population

module.exports.bootstrap = function(cb) {

  //skip seeding if production mode
  if (sails.config.environment === 'production' || sails.config.environment === 'development') {
    return cb();
  }

  // 底下的暂时封印


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
    School.create(schoolData).then(function(res){
      sails.log.debug("seeded: school");
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
        Dept.create(dept).exec(function(err, res){
          if (err) sails.log.error("error", err);
          next();
        });
      };
      async.waterfall([prepDept, insertSchool, saveDept],function(err, res){
        next();
      });
    }, function (err) {
      if (err) sails.log.error("error", err);
      sails.log.debug("seeded: depts");
      next();
    });
  };

  var seedPositions = function(next) {
    sails.log.debug("seeding positions");
    Position.create(positionData).then(function(res){
      sails.log.debug("seeded: position");
      next(); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: position");
      next(); return null;
    });
  };

  var seedTags = function (next) {
    sails.log.debug("seeding tags");
    Tag.create(tagData).then(function(res){
      sails.log.debug("seeded: tag");
      next(); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: tag");
      sails.log.error("error", err);
      next(); return null;
    });
  };


  var seedUsers = function(next) {
    sails.log.debug("seeding users");
    var users = [];
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
        Dept.findOne({"shortname": entry.dept}).exec(function(err, dept){
          if (err) sails.log.error("error", err);
          if (!dept) {
            sails.log.error("seed user error: " + entry.username + " : " + entry.dept);
          } else {
            user.dept = dept.id;
          }
          next();
        });
      };
      var saveUser = function(next) {
        users.push(user);
        sails.log.info("seed user " + users.length + ": " + user.username);
        next();
      };
      async.waterfall([prepUser, insertSchool, insertDept, saveUser],function (err, res) {
        if (err) sails.log.error("error", err);
        next();
      });
    }, function (err) {
      if (err) sails.log.error("error", err);
      User.create(users).exec(function(err, res){
        if (err) sails.log.error("error", err);
        sails.log.debug("seeded: " + users.length + " user");
        next();
      });
    });
  };

  var seedElective = function (next) {
    sails.log.debug("seeding elective");
    Elective.create(electiveData).then(function(res){
      sails.log.debug("seeded: elective");
      next(); return null;
    }).catch(function(err){
      sails.log.error("seeding failure: elective");
      next(); return null;
    });
  };

  //code,name,gender,position,dept,school,email,phone,birth,hometown,exp,group,motto,intro,legacy_courses,achievement,research,link
  var seedProfs = function(next) {
    var profs = [];
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
        School.findOne({"name": entry.school}).exec(function(err, res){
          if (err) sails.log.error("error", err);
          prof.school = res.id;
          next();
        });
      };
      var insertDept = function(next) {
        Dept.findOne({"longname": entry.dept}).exec(function(err, res){
          if (err) sails.log.error("error", err);
          if (res) {
            prof.dept = res.id;
          } else {
            prof.dept = null;
          }
          next();
        });
      };
      var saveProf = function(next) {
        profs.push(prof);
        sails.log.info("seed prof " + profs.length + ": " + prof.name);
        next();
      };
      async.waterfall([prepProf, insertSchool, insertDept, saveProf],function (err, res) {
        if (err) sails.log.error("error", err);
        next();
      });
    }, function (err) {
      if (err) sails.log.error("error", err);
      Prof.create(profs).exec(function(err, res){
        if (err) sails.log.error("error", err);
        sails.log.debug("seeded: " + profs.length + " prof");
        next();
      });
    });
  };

  //must constant: name,
  //must relation: school,dept,prof,
  //not sure: tags, stats, reviews, followers
  var seedCourses = function(next) {
    sails.log.debug("seeding course");
    var courses = [];
    var stats = [];
    async.eachSeries(courseData.results, function(entry, next){
    //async.eachSeries([courseData.results[0]], function(entry, next){
      var course = {};
      var stat = {};
      var prepCourse = function(next) {
        course.name = entry.name;

        // core stats
        stat.professional = entry.rate1;
        stat.expressive = entry.rate2;
        stat.kind = entry.rate3;
        stat.rateOverall = entry.rateOverall;
        stat.countReview = entry.reviewCount;
        stat.countGoodReview = entry.reviewGoodCount;

        // optional stats
        stat.countHomework = entry.homeworkCount;
        stat.rateHomework = entry.homeworkOverall;
        stat.countAttend = entry.attendanceCount;
        stat.rateAttend = entry.attendanceOverall;
        stat.countExam = entry.examCount;
        stat.rateExam = entry.examOverall;
        stat.countBird = entry.birdCount;
        stat.rateBird = entry.birdOverall;

        stat.followerCount = 0;

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
        Dept.findOne({"shortname": entry.dept}).exec(function(err, res){
          if (err) sails.log.error("error", err);
          if (res) {
            course.dept = res.id;
          } else {
            course.dept = null;
          }
          next();
        });
      };
      var insertProf = function(next) {
        Prof.findOne({"name": entry.prof}).exec(function(err, res){
          if (err) sails.log.error("error", err);
          if (res) {
            course.prof = res.id;
            next();
          } else {
            //create prof if not found
            Prof.create({name: entry.prof, school: course.school}).then(function(res){
              return res;
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
        CourseStat.create(stat).then(function(res){
          stats.push(res);
          return res;
        }).then(function(stat){
          course.stats = stat.id;
          courses.push(course);
          Course.create(course)
          .then(function(res){
            sails.log.info("stat id", stat.id);
            sails.log.info("seed course" + courses.length + ": " + course.name);
            next(); return res;
          }).catch(function(err){
            if (err) sails.log.error("error", err); return null;
          });
        }).catch(function(err){
          if (err) sails.log.error("error", err); return null;
        });
      };
      async.waterfall([prepCourse, insertSchool, insertDept, insertProf, saveCourse],function (err, res) {
        if (err) sails.log.error("error", err);
        next();
      });
    }, function (err) {
      if (err) sails.log.error("error", err);
      sails.log.debug("seeded: " + courses.length + " course");
      next();
    });
  };


//course reference error
var seedReviews = function(next) {
  sails.log.debug("seeding review");
  var reviews = [];
  async.eachSeries(reviewData.results, function(entry, next){
  //async.eachSeries([reviewData.results[0]], function(entry, next){
    var review = {};
    var prepReview = function(next) {

      //must
      review.text = entry.comment;
      review.professional = entry.rating.rate1;
      review.expressive = entry.rating.rate2;
      review.kind = entry.rating.rate3;

      //optional
      review.downVote = entry.downVote;
      review.upVote = entry.upVote;
      review.checkAttendance = entry.attendance.value + 1;
      review.birdy = entry.bird.value + 1;
      review.lotsHomework = entry.homework.value + 1;
      review.hasExam = entry.exam.touched;

      review.examprep = entry.exam.examprep.checked;
      review.openbook = entry.exam.openbook.checked;
      review.oldquestion = entry.exam.oldquestion.checked;
      review.easymark = entry.exam.easiness.checked;

      next();
    };
    var insertCourse = function(next){
      console.log("course",entry.courseName);
      console.log("prof",entry.profName);

      Course.find({name: entry.courseName})
      .populate('prof')
      .then(function(courses){
        var match = [];
        courses.forEach(function(course, index, arr){
          var prof = course.prof;
          if (entry.profName == prof.name) {
            review.course = course.id;
            match.push(course.id);
          }
        })
        if (match.length >= 2) {
          sails.log.warn("Found same course with same prof", review.course);
        } else if (match.length == 0) {
          sails.log.warn("Found no course with same prof", review.course);
          review.course = null;
        }
        next();return null;
      })
      .catch(function(err){
        if (err) sails.log.error("error", err);
        next();return null;
      });
    };
    var insertAuthor = function(next) {
      var authorId = entry.authorId.objectId;
      var authorName = null;
      userData.results.forEach(function(item, index, arr){
        if (item.objectId == authorId) {
          authorName = item.username;
        }
      });
      User.findOne({"username": authorName}).exec(function(err, res){
        if (err) sails.log.error("error", err);
        if (res) {
          review.author = res.id;
        } else {
          review.author = null;
        }
        next();
      });
    };
    var saveReview = function(next) {
      reviews.push(review);
      sails.log.info("seed review " + reviews.length + ": " + review.course);
      next();
    };
    async.waterfall([prepReview, insertCourse, saveReview],function (err, res) {
      if (err) sails.log.error("error", err);
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err);
    Review.create(reviews).exec(function(err, res){
      if (err) sails.log.error("error", err);
      sails.log.debug("seeded: " + reviews.length + " review");
      next();
    });
  });
};



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

}

*/
/*
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
      seedReviews,
    ], function(err) {
      if (err) sails.log.error("error", err);
      sails.log.debug("seeding compeleted");
    });
  }
  seedDB();
  // must call this, otherwise won't return
  cb();
};
