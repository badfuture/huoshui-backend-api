/**
 * ReviewsController
 *
 * @description :: Server-side logic for managing Review
 */

module.exports = {
  find: function(req,res){
    var defaultInclude = [
      { model: Course, as: 'Course'},
      { model: Tag, as: 'Tags'}
    ];
    var includeOption = ActionUtil.populateEach(req, defaultInclude);
    console.log(includeOption);
    Review.findAll({
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
      { model: Course, as: 'Course'},
      { model: Comment, as: 'Comments'},
      { model: User, as: 'Author',
        attributes: {
          exclude: ['password', 'salt']
        }
      },
      { model: Tag, as: 'Tags'}
    ];
    var includeOption = ActionUtil.populateEach(req, defaultInclude);

    Review.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },
};
