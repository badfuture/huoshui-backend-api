const courseStatModel = require('../classes/courseStatModel')

module.exports = {
  updateStat: (course) => {
    return course.getReviews({
        where: {'course_id': course.id},
        include: {
          model: Tag,
          as: 'Tags'
        }
    }).then((reviews) => {
        // update stats model
        let sModel = new courseStatModel()
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
                      sails.log.debug(`New Stat Created: id: ${course.id} | name: ${course.name}`)
                      return
                  })
                )
            }
        })
        .then(() => {
            sails.log.debug(`CourseStatWorker: id: ${course.id} | name: ${course.name} | review count: ${reviews.length} [completed]`)
        })
        .catch((err)=> {
            sails.log.error(err)
        })
    })
  }




}
