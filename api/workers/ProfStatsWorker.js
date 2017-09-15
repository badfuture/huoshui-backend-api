const pub = sails.hooks.publisher
const Promise = require('bluebird')
const profStatModel = require('../classes/profStatModel')

const updateProfStats = (profs) => {
    return profs.reduce((promise, prof) => {
        return promise.then(() => {
            return prof.getReviews({
                where: {'prof_id': prof.id}
            }).then((reviews) => {
                sails.log.debug(`ProfStatWorker: id: ${prof.id} | name: ${prof.name} | review count: ${reviews.length}`)
                // initialize stats model
                let sModel = new profStatModel()

                // update review stats
                sModel.updateWithReviews(reviews)

                return prof.update(sModel.getAggregatedScores())
                .then(() => prof.getStat())
                .then((stat) => {
                    // update stats object associated with the prof
                    // create one if not found
                    if(stat) {
                        return stat.update(sModel)
                    } else {
                        return Promise.resolve(
                          ProfStat.create(sModel)
                          .then((newStat)=>{
                              return prof.setStat(newStat)
                          })
                          .then(() => {
                              sails.log.debug(`New Stat Created: id: ${prof.id} | name: ${prof.name} `)
                              return
                          })
                        )
                    }
                }).then(() => {
                    sails.log.debug(`ProfStatWorker: id: ${prof.id} | name: ${prof.name} | review count: ${reviews.length} [completed]`)
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
