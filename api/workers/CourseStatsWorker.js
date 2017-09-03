const pub = sails.hooks.publisher;

var statsModelFactory = ()=>{
    return {
        //aggregated stats
        scoreOverall: 0,

        //core stats
        professional: 0,
        expressive: 0,
        kind: 0,
        countReview: 0,
        countGoodReview: 0,
        countAverageReview: 0,
        countBadReview: 0,
        countNetGoodTag: 0,
        countGoodTag: 0,
        countBadTag: 0,

        //secondary stats
        countHomework: 0,
        meanHomework: 0,
        countAttend: 0,
        meanAttend: 0,
        countBird: 0,
        meanBirdy: 0,
        countExam: 0,
        meanExam: 0,

        //exam details stats
        countExamDetails: 0,
        countExamPrep: 0,
        countExamOpenbook: 0,
        countExamOldquestion: 0,
        countExamEasymark: 0,
    }
};

var updateStats = (sModel, review)=>{
    //stats core
    sModel.professional += review.professional;
    sModel.expressive += review.expressive;
    sModel.kind += review.kind;

    let totalScore = review.professional + review.expressive + review.kind
    if (totalScore >= 12) {
        sModel.countGoodReview++;
    } else if (totalScore <= 11 && totalScore >= 8) {
        sModel.countAverageReview++;
    } else if (totalScore <= 7) {
        sModel.countBadReview++;
    }

    //tags
    if (review.Tags) {
      review.Tags.forEach((tag) => {
        if (tag.isPositive) {
          sModel.countGoodTag++
          sModel.countNetGoodTag++
        } else {
          sModel.countBadTag++
          sModel.countNetGoodTag--
        }
      })
    }

    //homework
    if (review.meanHomework !== 0) {
      sModel.countHomework++;
      sModel.meanHomework += review.meanHomework;
    }
    //attend
    if (review.meanAttend !== 0) {
      sModel.countAttend++;
      sModel.meanAttend += review.meanAttend;
    }
    //bird
    if (review.meanBirdy !== 0) {
      sModel.countBird++;
      sModel.meanBirdy += review.meanBirdy;
    }
    //exam
    if (review.meanExam !== 0) {
      sModel.countExam++;
      sModel.meanExam += review.meanExam;
    }

    //exam details
    if (review.hasExam) {
      sModel.countExamDetails++;
    }
    if (review.examprep) {
      sModel.countExamPrep++;
    }
    if (review.openbook) {
      sModel.countExamOpenbook++;
    }
    if (review.oldquestion) {
      sModel.countExamOldquestion++;
    }
    if (review.easymark) {
      sModel.countExamEasymark++;
    }
};

var normalizeStats = (sModel)=>{
    if (sModel.countReview > 0) {
      sModel.professional /= sModel.countReview;
      sModel.expressive /= sModel.countReview;
      sModel.kind /= sModel.countReview;
    }
    if (sModel.countHomework > 0) {
        sModel.meanHomework /= sModel.countHomework;
    }
    if (sModel.countAttend > 0) {
        sModel.meanAttend /= sModel.countAttend;
    }
    if (sModel.countBird > 0) {
        sModel.meanBirdy /= sModel.countBird;
    }
    if (sModel.countExam > 0) {
        sModel.meanExam /= sModel.countExam;
    }

};

let setAggregatedScores = (sModel) => {
  sModel.scoreOverall = RankService.getScoreOverall(sModel)
  sModel.scoreHot = RankService.getScoreHot(sModel)
  sModel.scoreRepute = RankService.getScoreRepute(sModel)
  sModel.scoreBirdy = RankService.getScoreBirdy(sModel)
  sModel.scoreAttend = RankService.getScoreAttend(sModel)
  sModel.scoreExam = RankService.getScoreExam(sModel)
  sModel.scoreHomework = RankService.getScoreHomework(sModel)
}

let getAggregatedScores = ({
    scoreOverall, scoreHot, scoreRepute, scoreBirdy, scoreAttend, scoreExam, scoreHomework
}) => ({
    scoreOverall, scoreHot, scoreRepute, scoreBirdy, scoreAttend, scoreExam, scoreHomework
})


module.exports = {
    concurrency: 1,
    perform: (job, context, done) => {
        var data = job.data;
        var id = job.id;
        var jobName = data.name;
        var title = data.title;
        var interval = data.interval;
        var doRemove = data.removeOnComplete;
        var executeTime = 5000;
        sails.log.debug("processing job: " + id + " | name: " + jobName);

        //get all courses
        //    for each course
        //        get all reviews
        //            aggregate all reviews
        //            get current course stats
        //            store the result in course stats model

        Course.findAll({})
        .then((courses)=> {
            courses.forEach((course)=>{
                course.getReviews({
                    where: {'course_id': course.id},
                    include: {
                      model: Tag,
                      as: 'Tags'
                    }
                })
                .then((reviews)=>{
                    //get metadata
                    var cName = course.name;
                    var cReviewCount = reviews.length;
                    job.log("name: " + cName + " | " + "review count: " + cReviewCount);

                    //initialize stats model
                    var sModel = statsModelFactory();

                    //aggregate review stats
                    sModel.countReview = cReviewCount;
                    reviews.forEach((review) => {
                        updateStats(sModel, review)
                    });

                    //normalize stats
                    normalizeStats(sModel);

                    //set aggregated scores
                    setAggregatedScores(sModel);

                    //update stats model
                    course.update(getAggregatedScores(sModel))
                    .then(() => course.getStat())
                    .then((stat)=>{
                        if(stat) {
                            stat.update(sModel).then(()=>{
                                job.log("updated name: " + cName + " | "
                                    + "review count: " + cReviewCount);
                            });
                        } else {
                            CourseStat.create(sModel)
                            .then((newStat)=>{
                                course.setStat(newStat);
                            })
                        }
                    })
                    .catch((err)=> {
                        sails.log.error(err);
                    });
                });
            });
        });

        //schedule next job
        pub.createJob(jobName, {
            title: title,
            name: jobName,
            interval: interval,
            removeOnComplete: doRemove
        }).delay(interval).removeOnComplete(doRemove).save();

        done();
    }
};
