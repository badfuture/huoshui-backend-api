/**
 * ProfsController
 *
 * @description :: Server-side logic for managing Prof
 */
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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

    const isPaginateFormat =  ActionUtil.parsePaginate(req)

    if (isPaginateFormat) {
      Prof.findAndCountAll(queryParams)
      .then(function(recordsFound){
        return res.ok(recordsFound);
      }).catch(function(err){
        return res.serverError(err);
      })
    } else {
      Prof.findAll(queryParams)
      .then(function(recordsFound){
        return res.ok(recordsFound)
      }).catch(function(err){
        return res.serverError(err)
      })
    }
  },

  findOne: function(req,res){
    const pk = ActionUtil.requirePk(req)
    const includes = ActionUtil.parsePopulate(req)
    const sort = ActionUtil.parseSort(req) || [
      [{ model: Review, as: 'Reviews' }, 'upVote', 'DESC'],
    ]

    Prof.findById(pk, {
      include: includes,
      order: OrderService.validateOrder(includes, 'Reviews') ? sort : null
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOneRandom: function(req, res) {
    Prof.findOne({
      include: ActionUtil.parsePopulate(req),
      where: {
        motto: {
          [Op.or]: {
            [Op.ne]: null,
            [Op.ne]: "",
          }
        }
      },
      order: sequelize.random()
    }).then((prof) => {
      return res.ok(prof)
    }).catch(function(err){
      return res.serverError(err)
    })
  },
};
