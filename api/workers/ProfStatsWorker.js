const pub = sails.hooks.publisher;

var statsModelFactory = ()=>{
    var model = {
        //core stats
        professional: 0,
        expressive: 0,
        kind: 0,
        countReview: 0,
        countGoodReview: 0,
        countAverageReview: 0,
        countBadReview: 0,
        scoreOverall: 0,

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
    };
    return model;
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

var computeScoreOverall = (sModel)=>{

  var C = 3.5; // mean score all score gravitates to (when votes are small)
  var M = 1; // minimum # of votes to be considered effective
  var r = (sModel.professional + sModel.expressive + sModel.kind)/3; // rating of the prof
  var v = sModel.countReview; // # of reviews
  var score = (v / (v + M)) * r + (M / (v + M)) * (C);
  return score;
};

var setScores = (sModel)=>{
  sModel.scoreOverall = computeScoreOverall(sModel);
};

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

        //get all profs
        //    for each prof
        //        get all reviews
        //            aggregate all reviews
        //            get current prof stats
        //            store the result in prof stats model

        Prof.findAll({})
        .then((profs)=> {
            profs.sort((a, b) => {
                return a.id - b.id
            })
            profs.forEach((prof)=>{
                prof.getReviews({
                    where: {'prof_id': prof.id}
                })
                .then((reviews)=>{
                    //get metadata
                    var pName = prof.name;
                    var pReviewCount = reviews.length;
                    sails.log.debug(`ProfStatWorker: id: ${prof.id} | name: ${prof.name} | review count: ${reviews.length}`)

                    //initialize stats model
                    var sModel = statsModelFactory();

                    //aggregate review stats
                    sModel.countReview = pReviewCount;
                    reviews.forEach((review)=>{
                        updateStats(sModel, review);
                    });

                    //normalize stats
                    normalizeStats(sModel);

                    //set scores
                    setScores(sModel);

                    //update stats model
                    prof.update({
                      scoreOverall: sModel.scoreOverall
                    })
                    .then(() => prof.getStat())
                    .then((stat)=>{
                        if(stat) {
                          return stat.update(sModel).then(()=>{})
                        } else {
                          return ProfStat.create(sModel)
                          .then((newStat)=>{
                              return prof.setStat(newStat)
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
