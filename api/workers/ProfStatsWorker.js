const pub = sails.hooks.publisher
const Promise = require('bluebird')
const profStatModel = require('../classes/profStatModel')

const updateProfStats = (profs) => {
    return profs.reduce((promise, prof) => {
        return promise.then(() => {
          ProfStatService.updateStat(prof)
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

        Prof.findAll({})
        .then((profs)=> {
          profs.sort((a, b) => {
            return a.id - b.id
          })
          return updateProfStats(profs)
        }).then(() => {
            sails.log.debug(`ProfStatWorker: all done!`)
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
}
