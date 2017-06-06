/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 */

module.exports = {

  find: function(req,res){
    var defaultInclude = [{ model: Dept, as: 'Depts'}];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    School.findAll({
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
    var defaultInclude = [{ model: Dept, as: 'Depts'}];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    School.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  create: function(req,res){
    var data = ActionUtil.parseValues(req);
    School.create(data).then(function(newRecord) {
       res.created(newRecord);
    }).catch(function(err){
       return res.serverError(err);
    });
  },
};
