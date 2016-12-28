var fs = require("fs");
var async = require("async");
var csv_parse = require('csv-parse/lib/sync');

//replace all roman numerals with regular English characters
var replace_roman = function(roman) {
    var eng_char = roman;
    var eng_char = eng_char.replace(/Ⅰ/gi, "I");
    eng_char = eng_char.replace(/Ⅱ/gi, "II");
    eng_char = eng_char.replace(/Ⅲ/gi, "III");
    eng_char = eng_char.replace(/Ⅳ/gi, "IV");
    return eng_char;
};

//seed the db with leancloud data
var path_common = sails.config.appPath + "/migration/data_common/";
var path_leancloud = sails.config.appPath + "/migration/data_leancloud/";

var file_position = "position.json";
var file_school = "school.json";
var file_tag = "tag.json";
var file_elective = "elective.json";
var file_prof = "prof.csv";

var file_user = "_User.json";
var file_course = "Courses.json";
var file_review = "Reviews.json";

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

//functions for seeding
var seedSchools = function(req, res, next) {
  sails.log.debug("seeding schools");
  School.bulkCreate(schoolData)
  .then(function(schools){
    sails.log.debug("seeded: school");
    next();
  })
  .catch(function(err){
    sails.log.error("seeding failure: school");
    sails.log.error(err);
    next();
  });
};


var seedDepts = function(req, res, next) {
  sails.log.debug("seeding dept");
  async.eachSeries(deptData, function(entry, next){
    var dept = {};
    var deptCreated= null;
    dept.shortname = entry.shortname;
    dept.longname = entry.longname;
    if (entry.hasOwnProperty("alias")) {
      dept.alias = entry.alias;
    }
    Dept.create(dept)
    .then(function(res){
      deptCreated = res;
      return School.findOne({ where: {"name": "西南交通大学"}});
    })
    .then(function(school){
      school.addDepts(deptCreated);
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err);
    sails.log.debug("seeded: depts");
    next();
  });
};


var seedPositions = function(req, res, next) {
  sails.log.debug("seeding positions");
  Position.bulkCreate(positionData)
  .then(function(res){
    sails.log.debug("seeded: position");
    next();
  })
  .catch(function(err){
    sails.log.error("seeding failure: position");
    next();
  });
};

var seedElective = function (req, res, next) {
  sails.log.debug("seeding elective");
  Elective.bulkCreate(electiveData)
  .then(function(res){
    sails.log.debug("seeded: elective");
    next();
  })
  .catch(function(err){
    sails.log.error("seeding failure: elective");
    next();
  });
};


var seedTags = function (req, res, next) {
  sails.log.debug("seeding tags");
  Tag.bulkCreate(tagData)
  .then(function(res){
    sails.log.debug("seeded: tag");
    next();
  })
  .catch(function(err){
    sails.log.error("seeding failure: tag");
    sails.log.error("error", err);
    next();
  });
};

var seedUsers = function(req, res, next) {
  sails.log.debug("seeding users");
  async.eachSeries(userData.results, function(entry, next){
    var userCreated = null;
    var user = {};
    user.username = entry.username;
    user.password = entry.password;
    user.salt = entry.salt;
    user.email = entry.email;
    user.firstYear = entry.year;

    User.create(user)
    .then(function(user){
      userCreated = user;
      return School.findOne({ where: {"name": "西南交通大学"}});
    })
    .then(function(school){
      school.addUsers(userCreated);
      return Dept.findOne({where: {"shortname": entry.dept}});
    })
    .then(function(dept){
      if (!dept) {
        Dept.findAll({})
        .then(function(depts){
          var deptFound = false;
          depts.forEach(function(dept, index, arr){
            deptData = dept.dataValues;
            if (deptData.hasOwnProperty("alias") && deptData.alias ) {
              deptData.alias.forEach(function(alias, index, arr) {
                if (alias == entry.dept) {
                  dept.addUsers(userCreated);
                  deptFound = true;
                }
              })
            }
          })
          if (!deptFound) {
            sails.log.error("seed user error, dept not exist: " + entry.username + " : " + entry.dept);
          }
        })
      } else {
        dept.addUsers(userCreated);
      }
      return User.count();
    })
    .then(function(countUser){
      sails.log.info("seed user " + countUser + ": " + user.username);
      next();
    })
    .catch(function(err){
      sails.log.error("seeding failure: user");
      sails.log.error("error", err);
      next();
    });

  }, function (err) {
    if (err) sails.log.error("error", err);
    sails.log.debug("seeded: depts");
    next();
  });
};

//code,name,gender,position,dept,school,email,phone,birth,hometown,exp,group,motto,intro,legacy_courses,achievement,research,link
var seedProfs = function(req, res, next) {
  sails.log.debug("seeding profs");
  async.eachSeries(profData, function(entry, next){
    var profCreated = {};
    var prof = {};
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

    Prof.create(prof)
    .then(function(results){
      profCreated = results;
      return School.findOne({ where: {"name": "西南交通大学"}});
    })
    .then(function(school){
      school.addProfs(profCreated);
      return Dept.findOne({where: {"longname": entry.dept}});
    })
    .then(function(dept){
      if (dept) {
        dept.addProfs(profCreated);
      }
      return Prof.count();
    })
    .then(function(countProf){
      sails.log.info("seed prof " + countProf + ": " + prof.name);
      next();
    })
    .catch(function(err){
      if (err) sails.log.error("error", err);
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err);
    sails.log.debug("seeded: profs");
    next();
  });
};

//must constant: name,
//must relation: school,dept,prof,
//not sure: tags, stats, reviews, followers
var seedCourses = function(req, res, next) {
  sails.log.debug("seeding course");
  async.eachSeries(courseData.results, function(entry, next){
    var courseCreated = null;
    var statCreated = null;
    var course = {};
    var stat = {};

    // course core
    course.name = entry.name;
    course.name = replace_roman(course.name);

    // stats core
    stat.professional = entry.rate1;
    stat.expressive = entry.rate2;
    stat.kind = entry.rate3;
    stat.rateOverall = entry.rateOverall;
    stat.countReview = entry.reviewCount;
    stat.countGoodReview = entry.reviewGoodCount;

    // stats stats
    stat.countHomework = entry.homeworkCount;
    stat.rateHomework = entry.homeworkOverall;
    stat.countAttend = entry.attendanceCount;
    stat.rateAttend = entry.attendanceOverall;
    stat.countExam = entry.examCount;
    stat.rateExam = entry.examOverall;
    stat.countBird = entry.birdCount;
    stat.rateBird = entry.birdOverall;
    stat.followerCount = 0;

    Course.create(course)
    .then(function(results){
      courseCreated = results;
      return School.findOne({ where: {"name": "西南交通大学"}});
    })
    .then(function(school){
      school.addCourses(courseCreated);
      return Dept.findOne({where: {"shortname": entry.dept}});
    })
    .then(function(dept){
      if (dept) {
        dept.addCourses(courseCreated);
      }
      return Prof.findOne({where: {"name": entry.prof}});
    })
    .then(function(prof){
      if (prof) {
        prof.addCourses(courseCreated);
      } else {
        //create prof if not found
        Prof.create({name: entry.prof})
        .then(function(newProf){
          newProf.addCourses(courseCreated);
        });
      }
      return CourseStat.create(stat);
    })
    .then(function(newStat){
      statCreated = newStat;
      courseCreated.setStat(statCreated);
      return Course.count();
    })
    .then(function(countCourse){
      sails.log.info("seed course " + countCourse + ": " + entry.prof + ": " + entry.name);
      next();
    })
    .catch(function(err){
      if (err) sails.log.error("error", err);
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err);
    sails.log.debug("seeded: courses");
    next();
  });
};

var seedReviews = function(req, res, next) {
  sails.log.debug("seeding review");
  async.eachSeries(reviewData.results, function(entry, next){
    var reviewCreated = null;
    var review = {};

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

    entry.courseName = replace_roman(entry.courseName);
    console.log("course",entry.courseName);
    console.log("prof",entry.profName);

    Review.create(review)
    .then(function(newReview){
      reviewCreated = newReview;

      var authorLeancloudId = entry.authorId.objectId;
      var authorName = null;
      userData.results.forEach(function(item, index, arr){
        if (item.objectId == authorLeancloudId) {
          authorName = item.username;
        }
      });
      return User.findOne({where: {"username": authorName}})
    })
    .then(function(userFound){
      userFound.addReviews(reviewCreated);
      return Course.findOne({
        where: {"name": entry.courseName},
        include: [{
          model: Prof, as: 'Prof',
          where: {
            name: entry.profName
          }
        }]
      });
    })
    .then(function(courseFound){
      if (!courseFound) {
        sails.log.warn("Found no course with same prof as review");
      } else {
        courseFound.addReviews(reviewCreated);
      }
      //TODO: update ReviewTag join table
      var tagsArray = entry.tags;
      async.eachSeries(tagsArray, function(tag, next){
        tagName = tag.value;
        Tag.findOne({where: {"name": tagName }})
        .then(function(tagFound){
          reviewCreated.setTags([tagFound])
          .then(function(){
            next();
          });
        });
      });
    })
    .then(function(){
      return Review.count();
    })
    .then(function(reviewCount){
      sails.log.info("seed review " + reviewCount + ": " + entry.profName + ": " + entry.courseName);
      next();
    })
    .catch(function(err){
      if (err) sails.log.error("error", err);
      next();
    });

  }, function (err) {
    if (err) sails.log.error("error", err);
    sails.log.debug("seeded: reviews");
    next();
  });
};

module.exports = {
  seedDB: function(req, res) {

    var orderedActionList = [
      seedSchools.bind(this, req, res),
      seedDepts.bind(this, req, res),
      seedPositions.bind(this, req, res),
      seedElective.bind(this, req, res),
      seedTags.bind(this, req, res),
      seedUsers.bind(this, req, res),
      seedProfs.bind(this, req, res),
      seedCourses.bind(this, req, res),
      seedReviews.bind(this, req, res)
    ];

    async.series(orderedActionList, function (err, resultsArray) {
      if (err) {
        sails.log.error("error", err);
      } else {
        sails.log.debug("seeding compeleted");
        res.ok("seeding completed!");
      }
    });
  }
};
