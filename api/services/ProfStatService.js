const profStatModel = require('../classes/profStatModel')

module.exports = {
  updateStat: (prof) => {
    return prof.getReviews({
        where: {'prof_id': prof.id}
    }).then((reviews) => {
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
  }




}
