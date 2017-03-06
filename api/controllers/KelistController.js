/**
 * PositionController
 *
 * @description :: Server-side logic for managing positions
 */

module.exports = {
	find: function(req,res){
    var defaultInclude = [];
    var includeOption = ActionUtil.populateEach(req, defaultInclude);

    Kelist.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: includeOption
    }).then(function(recordsFound){
      return res.ok(recordsFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    var pk = ActionUtil.requirePk(req);
    var defaultInclude = [];
    var includeOption = ActionUtil.populateEach(req, defaultInclude);

    Kelist.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },
};
