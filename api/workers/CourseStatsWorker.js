const pub = sails.hooks.publisher
const Promise = require('bluebird')
const courseStatModel = require('../classes/courseStatModel')


const updateCourseStats = (courses) => {
    return courses.reduce((promise, course) => {
        return promise.then(() => {
            return course.getReviews({
                where: {'course_id': course.id},
                include: {
                  model: Tag,
                  as: 'Tags'
                }
            }).then((reviews) => {
                sails.log.debug(`CourseStatWorker: id: ${course.id} | name: ${course.name} | review count: ${reviews.length}`)
                // initialize stats model
                let sModel = new courseStatModel()

                // update review stats
                sModel.updateWithReviews(reviews)

                return course.update(sModel.getAggregatedScores())
                .then(() => course.getStat())
                .then((stat) => {
                    // update stats object associated with the course
                    // create one if not found
                    if(stat) {
                        return stat.update(sModel)
                    } else {
                        return Promise.resolve(
                          CourseStat.create(sModel)
                          .then((newStat)=>{
                              return course.setStat(newStat)
                          })
                          .then(() => {
                              sails.log.debug(`New Stat Created: id: ${course.id} | name: ${course.name} [completed]`)
                              return
                          })
                        )
                    }
                }).then(() => {
                    sails.log.debug(`CourseStatWorker: id: ${course.id} | name: ${course.name} | review count: ${reviews.length} [completed]`)
                })
                .catch((err)=> {
                    sails.log.error(err)
                })
            })
        })
    }, Promise.resolve())
}


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

        Course.findAll({
          sort: [['id', 'ASC']]
        })
        .then((courses)=> {
            courses.sort((a, b) => {
                return a.id - b.id
            })
            return updateCourseStats(courses)
        }).then(() => {
            sails.log.debug(`CourseStatWorker: all done!`)
        })

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
