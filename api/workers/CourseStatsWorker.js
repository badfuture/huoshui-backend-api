const pub = sails.hooks.publisher
const Promise = require('bluebird')
const courseStatModel = require('../classes/courseStatModel')

const updateCourseStats = (courses) => {
    return courses.reduce((promise, course) => {
        return promise.then(() => {
          CourseStatService.updateStat(course)
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
        sails.log.debug("processing job: " + id + " | name: " + jobName)

        Course.findAll({})
        .then((courses)=> {
            courses.sort((a, b) => {
              return a.id - b.id
            })
            return updateCourseStats(courses)
        }).then(() => {
            sails.log.debug(`CourseStatWorker: all done!`)
            done()
        })

        //schedule next job
        pub.createJob(jobName, {
            title: title,
            name: jobName,
            interval: interval,
            removeOnComplete: doRemove
        }).delay(interval).removeOnComplete(doRemove).save()
    }
};
