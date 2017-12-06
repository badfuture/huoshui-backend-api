/**
 * DeptController
 *
 * @description :: Server-side logic for managing Depts
 */

module.exports = {
	find: function(req,res){
    var defaultInclude = [
      { model: School, as: 'School'},
    ];
		var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Dept.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req) || [['id', 'ASC']],
      include: includeOption
    }).then(function(recordsFound){
      return res.ok(recordsFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    var pk = ActionUtil.requirePk(req);
    var defaultInclude = [
      { model: School, as: 'School'},
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

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
