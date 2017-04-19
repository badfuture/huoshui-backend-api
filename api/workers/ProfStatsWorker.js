var pub = sails.hooks.publisher;

var isGoodReview = (review)=>{
    var professional = review.professional;
    var expressive = review.expressive;
    var kind = review.kind;
    var total = professional + expressive + kind;
    if (total > 11){
        return true;
    }
};

var statsModelFactory = ()=>{
    var model = {
        //core stats
        professional: 0,
        expressive: 0,
        kind: 0,
        countReview: 0,
        countGoodReview: 0,
        scoreOverall: 0,

        //secondary stats
        countHomework: 0,
        lotsHomework: 0,
        countAttend: 0,
        checkAttend: 0,
        countBird: 0,
        birdy: 0,
        countExam: 0,
        examHard: 0,

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
    if (isGoodReview(review)) {
        sModel.countGoodReview++;
    }

    //homework
    if (review.lotsHomework !== 0) {
      sModel.countHomework++;
      sModel.lotsHomework += review.lotsHomework;
    }
    //attend
    if (review.checkAttend !== 0) {
      sModel.countAttend++;
      sModel.checkAttend += review.checkAttend;
    }
    //bird
    if (review.birdy !== 0) {
      sModel.countBird++;
      sModel.birdy += review.birdy;
    }
    //exam
    if (review.examHard !== 0) {
      sModel.countExam++;
      sModel.examHard += review.examHard;
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
        sModel.lotsHomework /= sModel.countHomework;
    }
    if (sModel.countAttend > 0) {
        sModel.checkAttend /= sModel.countAttend;
    }
    if (sModel.countBird > 0) {
        sModel.birdy /= sModel.countBird;
    }
    if (sModel.countExam > 0) {
        sModel.examHard /= sModel.countExam;
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
            profs.forEach((prof)=>{
                prof.getReviews({
                    where: {'prof_id': prof.id}
                })
                .then((reviews)=>{
                    //get metadata
                    var pName = prof.name;
                    var pReviewCount = reviews.length;
                    job.log("name: " + pName + " | " + "review count: " + pReviewCount);

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
                            stat.update(sModel).then(()=>{
                                job.log("updated name: " + pName + " | "
                                    + "review count: " + pReviewCount);
                            });
                        } else {
                            ProfStat.create(sModel)
                            .then((newStat)=>{
                                prof.setStat(newStat);
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
