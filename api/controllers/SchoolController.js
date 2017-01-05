/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 */

module.exports = {

  find: function(req,res){
    School.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: [{ model: Dept, as: 'Depts'}]
    }).then(function(schoolsFound){
      return res.ok(schoolsFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    var populate = ActionUtil.populateEach(req);
    var pk = ActionUtil.requirePk(req);

    School.findById(pk, {
      include: [{ model: Dept, as: 'Depts'}]
    }).then(function(schoolFound) {
      if(!schoolFound) return res.notFound('No record found with the specified `id`.');
      res.ok(schoolFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  create: function(req,res){
    var data = ActionUtil.parseValues(req);
    School.create(data).then(function(newInstance) {
       res.created(newInstance);
    }).catch(function(err){
       return res.serverError(err);
    });
  },
};
