/**
 * CoursesController
 *
 * @description :: Server-side logic for managing Course
 */
const Sequelize = require('sequelize')

module.exports = {

  find: function(req,res){
    const queryParams = {
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: ActionUtil.parsePopulate(req),
      distinct: true
    }

    const reviewedOnly = req.param('reviewedOnly')
    if (reviewedOnly) {
      queryParams.where = _.extend(queryParams.where, {
        "$Stat.countReview$": {
          [Sequelize.Op.gte]: 1,
        }
      })
    }

    const isPaginateFormat =  ActionUtil.parsePaginate(req)
    if (isPaginateFormat) {
      Course.findAndCountAll(queryParams)
      .then(function(recordsFound){
        return res.ok(recordsFound);
      }).catch(function(err){
        return res.serverError(err);
      })
    } else {
      Course.findAll(queryParams)
      .then(function(recordsFound){
        return res.ok(recordsFound);
      }).catch(function(err){
        return res.serverError(err);
      })
    }
  },

  findOne: function(req,res){
    const pk = ActionUtil.requirePk(req)
    const includes = ActionUtil.parsePopulate(req)
    const sort = ActionUtil.parseSort(req) || [
      [{ model: Review, as: 'Reviews' }, 'upVote', 'DESC'],
    ]

    Course.findById(pk, {
      include: includes,
      order: OrderService.validateOrder(includes, 'Reviews') ? sort : null
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

};
