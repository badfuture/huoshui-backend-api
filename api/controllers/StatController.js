/**
 * StatController
 *
 * @description :: Server-side logic for get stats
 */

const promise = require('bluebird')

const getCourseCount = () => {
  return Course.count()
}
const getReviewCount = () => {
  return Review.count()
}
const getUserCount = () => {
  return User.count()
}
const getProfCount = () => {
  return Prof.count()
}

module.exports = {
  getGlobalStat: function(req, res) {
    let stat = {}
    Promise.all([getCourseCount(), getReviewCount(), getUserCount(), getProfCount()])
    .then((result) => {
      stat = {
        count: {
          course: result[0],
          review: result[1],
          user: result[2],
          prof: result[3]
        }
      }
      return res.ok(stat)
    })
    .catch((err) => {
      return res.serverError(err)
    })
	}
};
