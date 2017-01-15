/**
 * StatController
 *
 * @description :: Server-side logic for managing Stats
 */

module.exports = {
  find: function(req,res){
		var customInclude = ActionUtil.populateEach(req);
    var defaultInclude = [];
    var includeOption = (customInclude.length === 0)
                  ? defaultInclude : customInclude;

    Dept.findAll({
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
		var customInclude = ActionUtil.populateEach(req);
    var defaultInclude = [];
    var includeOption = (customInclude.length === 0)
                  ? defaultInclude : customInclude;

    Dept.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

};
