/**
 * ProfsController
 *
 * @description :: Server-side logic for managing Prof
 */

module.exports = {
  find: function(req,res){
    var defaultInclude = [
      { model: Dept, as: 'Depts'},
      { model: School, as: 'School'},
      { model: Position, as: 'Position'},
      { model: Tag, as: 'Tags'}
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Prof.findAll({
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
    var defaultInclude = [
      { model: Dept, as: 'Depts'},
      { model: School, as: 'School'},
      { model: Position, as: 'Position'},
      { model: Course, as: 'Courses'},
      { model: Tag, as: 'Tags'}
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Prof.findById(pk, {
      include: includeOption,
      order: ActionUtil.parseSort(req) || [
        [{ model: Review, as: 'Reviews' }, 'createdAt', 'DESC'],
      ]
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },
};
