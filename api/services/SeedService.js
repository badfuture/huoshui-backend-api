const Promise = require('bluebird')
const async = require("async")
const SeedData = require('../classes/seedData')

var seedSchools = function(schoolData, job, next) {
  sails.log.debug("seeding schools");
  async.eachSeries(schoolData, function(entry, next){
    var school = {};
    school.name = entry.name;
    school.campus = entry.campus;

    School.create(school)
    .then(function(schools){
      next();
    })
    .catch(function(err){
      sails.log.error(err.errors);
      next(err);
    });
  }, function (err) {
    if (err) {
      sails.log.error("seeding failure: school");
    } else {
      sails.log.debug("seeded: schools");
    }
    job.progress(0.5, 10);
    next();
  });
};

var seedDepts = function(deptData, job, next) {
  sails.log.debug("seeding dept");
  async.eachSeries(deptData, function(entry, next){
    var dept = {};
    var deptCreated= null;
    dept.shortname = entry.shortname;
    dept.longname = entry.longname;
    dept.image = entry.image;
    dept.icon = entry.icon;
    if (entry.hasOwnProperty("alias")) {
      dept.alias = entry.alias;
    }
    Dept.create(dept)
    .then(function(res){
      deptCreated = res;
      return School.findOne({ where: {"name": "西南交通大学"}});
    })
    .then(function(school){
      return school.addDept(deptCreated);
    })
    .then(function(){
      next();
    })
    .catch(function(err){
      sails.log.error(err.message);
      next(err);
    });
  }, function (err) {
    if (err) {
      sails.log.error("seeding failure: dept");
    } else {
      sails.log.debug("seeded: depts");
    }
    job.progress(1, 10);
    next();
  });
};


var seedPositions = function(positionData, job, next) {
  sails.log.debug("seeding positions");
  Position.bulkCreate(positionData)
  .then(function(res){
    sails.log.debug("seeded: position");
    job.progress(1.5, 10);
    next();
  })
  .catch(function(err){
    sails.log.error("seeding failure: position");
    next();
  });
};

var seedTags = function (tagData, job, next) {
  sails.log.debug("seeding tags");
  Tag.bulkCreate(tagData)
  .then(function(res){
    sails.log.debug("seeded: tag");
    job.progress(2, 10);
    next();
  })
  .catch(function(err){
    sails.log.error("seeding failure: tag");
    sails.log.error("error", err);
    next();
  });
};

var seedUsers = function(userData, job, next) {
  sails.log.debug("seeding users");
  async.eachSeries(userData.results, function(entry, next){
    var userCreated = null;
    var kelistCreated = null;
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
      return school.addUser(userCreated);
    })
    .then(function(){
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
                  dept.addUser(userCreated);
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
        dept.addUser(userCreated);
      }
    })
    .then(()=> {
      return KelistService.createDefaultKelist()
    })
    .then((results)=> {
      var kelistCreated = results;
      return userCreated.addOwnsKelists(kelistCreated);
    })
    .then(()=> {
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
    sails.log.debug("seeded: users");
    job.progress(3, 10);
    next();
  });
};

//code,name,gender,position,dept,school,email,phone,birth,hometown,exp,group,motto,intro,legacy_courses,achievement,research,link
var seedProfs = function(profData, job, next) {
  sails.log.debug("seeding profs");
  sails.log.debug("length", profData.length)
  async.eachSeries(profData, function(entry, next){
    var profCreated = {};
    var prof = {};
    prof.code = entry.code;
    prof.name = entry.name;
    if (entry.gender == "男") {
      prof.gender = "男";
    } else if (entry.gender == "女") {
      prof.gender = "女";
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
    prof.motto = entry.motto;
    prof.intro = entry.intro;
    prof.education = entry.education;
    prof.research = entry.research;
    prof.achievement = entry.achievement;
    prof.legacyCourses = entry.legacyCourses;
    prof.officialSite = "http://202.115.71.132/servlet/TeacherHomepageAction?TeacherID=" + entry.code;
    sails.log.info("seed prof " + prof.name);
    Prof.create(prof)
    .then(function(results){
      profCreated = results;
      return School.findOne({ where: {"name": "西南交通大学"}});
    })
    .then(function(school){
      school.addProf(profCreated);
      return Dept.findOne({where: {"longname": entry.dept}});
    })
    .then(function(dept){
      if (dept) {
        return dept.addProf(profCreated);
      }
    })
    .then(()=>{
      return Position.findOne({where: {"name": entry.position}});
    })
    .then((position)=>{
      if (position){
        return position.addProf(profCreated);
      } else if (entry.position) {
        sails.log.debug("unknown position", entry.position);
      }
    })
    .then(()=>{
      return Prof.count();
    })
    .then(function(countProf){
      sails.log.info("seeded prof " + countProf + ": " + prof.name);
      next();
    })
    .catch(function(err){
      if (err) sails.log.error("error", err);
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err);
    sails.log.debug("seeded: profs");
    job.progress(4, 10);
    next();
  });
};

//must constant: name,
//must relation: school,dept,prof,
//not sure: tags, stats, reviews, followers
var seedCourses = function(courseData, job, next) {
  sails.log.debug("seeding course");
  async.eachSeries(courseData.results, function(entry, next){
    var courseCreated = null;
    var statCreated = null;
    var course = {};
    var stat = {};

    // course core
    course.name = SeedUtil.replaceRoman(entry.name);
    course.isElective = (entry.isElective) ? entry.isElective : null;
    course.audience = (entry.audience) ? entry.audience : null;

    // stats core
    stat.professional = entry.rate1;
    stat.expressive = entry.rate2;
    stat.kind = entry.rate3;
    stat.scoreOverall = entry.rateOverall;
    stat.countReview = entry.reviewCount;
    stat.countGoodReview = entry.reviewGoodCount;

    // stats secondary
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
      school.addCourse(courseCreated);
      return Dept.findOne({where: {"shortname": entry.dept}});
    })
    .then(function(dept){
      if (dept) {
        dept.addCourse(courseCreated);
      }
      return Prof.findOne({where: {"name": entry.prof}});
    })
    .then(function(prof){
      if (prof) {
        prof.addCourse(courseCreated);
      } else {
        //create prof if not found
        Prof.create({name: entry.prof})
        .then(function(newProf){
          newProf.addCourse(courseCreated);
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
    job.progress(5, 10);
    next();
  });
};

var seedReviews = function(userData, reviewData, job, next) {
  sails.log.debug("seeding review");
  async.eachSeries(reviewData.results, function(entry, next){
    var reviewCreated = null;
    var courseFound = null;
    var profFound = null
    var review = {};

    //must
    review.text = entry.comment;
    review.professional = entry.rating.rate1;
    review.expressive = entry.rating.rate2;
    review.kind = entry.rating.rate3;

    //optional: exam data
    review.hasExam = entry.exam.touched;
    review.examprep = entry.exam.examprep.checked;
    review.openbook = entry.exam.openbook.checked;
    review.oldquestion = entry.exam.oldquestion.checked;
    review.easymark = entry.exam.easiness.checked;

    //optional: secondary data
    review.rateAttend = entry.attendance.value + 1;
    review.rateBirdy = entry.bird.value + 1;
    review.rateHomework = entry.homework.value + 1;
    review.rateExam = 0;
    if (entry.exam.difficulty && entry.exam.difficulty.value
                              && entry.exam.difficulty.value > 0) {
      review.rateExam = entry.exam.difficulty.value;
    } else if (review.hasExam) {
      review.rateExam = SeedUtil.getRateExam({
        examprep: review.examprep,
        openbook: review.openbook,
        oldquestion: review.oldquestion,
        easymark: review.easymark
      })
    }

    //optional: upvote/downvote
    review.downVote = entry.downVote;
    review.upVote = entry.upVote;

    //date
    review.createdAt = entry.createdAt;
    review.updatedAt = entry.updatedAt;

    //additional parsing
    entry.courseName = SeedUtil.replaceRoman(entry.courseName);

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
      return userFound.addReview(reviewCreated);
    })
    .then(()=> {
      return Prof.findOne({
        where: {"name": entry.profName}
      })
    })
    .then((results)=> {
      profFound = results
      return profFound.addReview(reviewCreated);
    })
    .then(function(){
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
    .then(function(results){
      courseFound = results;
      if (!courseFound) {
        sails.log.error("Found no course with same prof as review");
        sails.log.error("course name", entry.courseName );
        sails.log.error("review prof", entry.profName);
      } else {
        return courseFound.addReview(reviewCreated);
      }
    })
    .then(() => {
      return CourseStatService.updateStat(courseFound)
    })
    .then(() => {
      return ProfStatService.updateStat(profFound)
    })
    .then(()=> {
      var tagsArray = entry.tags;
      return Promise.all(tagsArray).map((tag)=> {
        tagName = tag.value;
        var tagFound = null;
        var tagFoundId = null;
        var profFound = null;

        return Tag
        .findOne({where: {"name": tagName }})
        .then((results)=> {
          tagFound = results;
          tagFoundId = tagFound.get('id');
          return Prof.findOne({where: {name: entry.profName}});
        })
        .then((results)=> {
          profFound = results;
          return profFound.addTag(tagFound);
        })
        .then(()=> {
          return profFound.getTags({where: {"id": tagFoundId}});
        })
        .then((profTags)=> {
          return profTags[0].Join_Item_Tag.increment({'count': 1});
        })
        .then(()=> {
          return reviewCreated.addTag(tagFound);
        })
        .then(()=> {
          return courseFound.addTag(tagFound);
        })
        .then(()=> {
          return courseFound.getTags({where: {"id": tagFoundId}});
        })
        .then((courseTags)=> {
          return courseTags[0].Join_Item_Tag.increment({'count': 1});
        })
        .catch((err)=> {
          if (err) {
            sails.log.error("error", err.errors);
          }
        });
      });
    })
    .then(()=> {
      return Review.count();
    })
    .then((reviewCount)=> {
      sails.log.info("seeded review " + reviewCount + ": " + entry.profName + ": " + entry.courseName);
      next();
    })
    .catch((err)=> {
      if (err) {
        sails.log.error("course name", entry.courseName );
        sails.log.error("prof name", entry.profName);
        sails.log.error("review", review);
        sails.log.error("error", err);
      }
      next();
    });

  }, (err)=>  {
    if (err) sails.log.error("error", err);
    sails.log.debug("seeded table: reviews");
    job.progress(6, 10);
    next();
  });
};

var seedKelists = function(seedData, job, next) {
  sails.log.debug("seeding Kelists");

  async.eachSeries(seedData.likedCourse.results, function(entry, next){
    var courseLeanId = entry.relatedId;
    var userLeanId = entry.owningId;

    var username = null;
    var courseName = null;
    var courseProf = null;
    var courseFound = null;
    var userFound = null;

    seedData.user.results.forEach(function(item, index, arr){
      if (item.objectId == userLeanId) {
        username = item.username;
      }
    });
    seedData.course.results.forEach(function(item, index, arr){
      if (item.objectId == courseLeanId) {
        courseName = SeedUtil.replaceRoman(item.name);
        courseProf = item.prof;
      }
    });

    Course.findOne({
      where: {name: courseName},
      include: [
        {
          model: Prof, as: 'Prof',
          where: {name: courseProf}
        }
      ]
    })
    .then((results)=> {
      courseFound = results;
      return User.findOne({where:{
        username: username
      }})
    })
    .then((results)=> {
      userFound = results;
      return userFound.getOwnsKelists({
        where: {category: 'default_personal_kelist'}
      });
    })
    .then((results)=> {
      sails.log.info("seeded kelist " + ": " + username
                    + ": " + courseName + ": " + courseProf);
      var kelist = results[0];
      kelist.addCourse(courseFound);
      next();
    })
    .catch(function(err){
      if (err) {
        sails.log.error("error", err);
      }
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err.errors);
    sails.log.debug("seeded kelists");
    job.progress(7, 10);
    next();
  });
};


var seedLikedReviews = function(seedData, job, next) {
  sails.log.debug("seeding associations: User:LikedReviews:Review");
  async.eachSeries(seedData.likedReview.results, function(entry, next){
    var reviewLeanId = entry.relatedId;
    var userLeanId = entry.owningId;
    var username = null;
    var reviewCourse = null;
    var reviewProf = null;
    var reviewAuthor = null;
    var reviewFound = null;
    var userFound = null;

    seedData.user.results.forEach(function(item, index, arr){
      if (item.objectId == userLeanId) {
        username = item.username;
      }
    });
    seedData.review.results.forEach(function(item, index, arr){
      if (item.objectId == reviewLeanId) {
        reviewCourse = item.courseName;
        reviewProf = item.profName;
        var authorLeanId = item.authorId.objectId;
        seedData.user.results.forEach(function(item, index, arr){
          if (item.objectId == authorLeanId) {
            reviewAuthor = item.username;
          }
        });
      }
    });

    Review.findOne({
      include: [
        {
          model: User, as: 'Author',
          where: {username: reviewAuthor}
        }, {
          model: Course, as: 'Course',
          where: {name: reviewCourse}
        }, {
          model: Prof, as: 'Prof',
          where: {name: reviewProf}
        }
      ]
    })
    .then((results)=> {
      reviewFound = results;
      return User.findOne({where:{
        username: username
      }})
    })
    .then((results)=> {
      userFound = results;
      if (reviewFound && userFound) {
        sails.log.info("seeded relation " + ": " + username
                      + ": " + reviewCourse + ": " + reviewProf + ":" + reviewAuthor);
        userFound.addLikedReview(reviewFound);
      }
      next();
    })
    .catch(function(err){
      if (err) {
        sails.log.info("seeded relation " + ": " + username
                      + ": " + reviewCourse + ": " + reviewProf + ":" + reviewAuthor);
        sails.log.error("error", err);
      }
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err.errors);
    sails.log.debug("seeded relation: User:LikedReviews:Review");
    job.progress(7, 10);
    next();
  });
};


var seedDislikedReviews = function(seedData, job, next) {
  sails.log.debug("seeding associations: User:DislikedReviews:Review");
  async.eachSeries(seedData.dislikedReview.results, function(entry, next){
    var reviewLeanId = entry.relatedId;
    var userLeanId = entry.owningId;
    var username = null;
    var reviewCourse = null;
    var reviewProf = null;
    var reviewAuthor = null;
    var reviewFound = null;
    var userFound = null;

    seedData.user.results.forEach(function(item, index, arr){
      if (item.objectId == userLeanId) {
        username = item.username;
      }
    });
    seedData.review.results.forEach(function(item, index, arr){
      if (item.objectId == reviewLeanId) {
        reviewCourse = item.courseName;
        reviewProf = item.profName;
        var authorLeanId = item.authorId.objectId;
        seedData.user.results.forEach(function(item, index, arr){
          if (item.objectId == authorLeanId) {
            reviewAuthor = item.username;
          }
        });
      }
    });

    Review.findOne({
      include: [
        {
          model: User, as: 'Author',
          where: {username: reviewAuthor}
        }, {
          model: Course, as: 'Course',
          where: {name: reviewCourse}
        }, {
          model: Prof, as: 'Prof',
          where: {name: reviewProf}
        }
      ]
    })
    .then((results)=> {
      reviewFound = results;
      return User.findOne({where:{
        username: username
      }})
    })
    .then((results)=> {
      userFound = results;
      if (reviewFound && userFound) {
        sails.log.info("seeded relation " + ": " + username
                      + ": " + reviewCourse + ": " + reviewProf + ":" + reviewAuthor);
        userFound.addDislikedReview(reviewFound);
      }
      next();
    })
    .catch(function(err){
      if (err) {
        sails.log.info("seeded relation " + ": " + username
                      + ": " + reviewCourse + ": " + reviewProf + ":" + reviewAuthor);
        sails.log.error("error", err);
      }
      next();
    });
  }, function (err) {
    if (err) sails.log.error("error", err.errors);
    sails.log.debug("seeded relation: User:DislikedReviews:Review");
    job.progress(8, 10);
    next();
  });
};

module.exports = {
  seedDB: (mode) => {
    var publisher = sails.hooks.publisher;
    var queue = publisher.queue;
    var seedJob = publisher.create('seed_service', {
      Title: 'seed initial data for db'
    })
    .priority('medium')
    .save();

    const seedData = new SeedData(mode)

    queue.process("seed_service", function(job, jobDone){
      var orderedActionList = [
        seedSchools.bind(this, seedData.school, job),
        seedDepts.bind(this, seedData.dept, job),
        seedPositions.bind(this, seedData.position, job),
        seedTags.bind(this, seedData.tag, job),
        seedUsers.bind(this, seedData.user, job),
        seedProfs.bind(this, seedData.prof, job),
        seedCourses.bind(this, seedData.course, job),
        seedReviews.bind(this, seedData.user, seedData.review, job),
        seedKelists.bind(this, seedData, job),
        seedLikedReviews.bind(this, seedData, job),
        seedDislikedReviews.bind(this, seedData, job)
      ];

      Meta.findAll()
      .then((results) => {
        let meta = results[0]
        if (meta) {
          meta.seeded = true
          meta.save()
        } else {
          Meta.create({
            seeded: true
          })
        }
      })
      .catch((err) => {
        res.serverError(err)
      })

      async.series(orderedActionList, function (err, resultsArray) {
        // update metadata
        if (err) {
          sails.log.error("error", err);
        } else {
          sails.log.debug("seeding compeleted");
          jobDone();
        }
      });

    });
  },
};
