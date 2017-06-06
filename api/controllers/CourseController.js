/**
 * CoursesController
 *
 * @description :: Server-side logic for managing Course
 */

module.exports = {

  find: function(req,res){
    var defaultInclude = [
      { model: School, as: 'School'},
      { model: Prof, as: 'Prof'},
      { model: Dept, as: 'Depts'},
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    const queryParams = {
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: includeOption,
      distinct: true
    }

    const isPaginateFormat =  ActionUtil.parsePaginate(req);

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
    var pk = ActionUtil.requirePk(req);
    var defaultInclude = [
      { model: School, as: 'School'},
      { model: Prof, as: 'Prof'},
      { model: Tag, as: 'Tags'},
      { model: Dept, as: 'Depts'},
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Course.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },


};
