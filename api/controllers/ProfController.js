/**
 * ProfsController
 *
 * @description :: Server-side logic for managing Prof
 */

module.exports = {
  find: function(req,res){
    Prof.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: ActionUtil.parsePopulate(req),
    }).then(function(recordsFound){
      return res.ok(recordsFound)
    }).catch(function(err){
      return res.serverError(err)
    });
  },

  findOne: function(req,res){
    const pk = ActionUtil.requirePk(req)
    const includes = ActionUtil.parsePopulate(req)
    const sort = ActionUtil.parseSort(req) || [
      [{ model: Review, as: 'Reviews' }, 'createdAt', 'DESC'],
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
};
