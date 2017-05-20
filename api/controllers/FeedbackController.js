/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing Feedback
 */

module.exports = {

  find: (req,res) => {
    let defaultInclude = [];
    let includeOption = ActionUtil.populateEach(req, defaultInclude);

    Feedback.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: includeOption
    }).then((recordsFound) => {
      return res.ok(recordsFound);
    }).catch((err) => {
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    let pk = ActionUtil.requirePk(req);
    let defaultInclude = [];
    let includeOption = ActionUtil.populateEach(req, defaultInclude);

    Feedback.findById(pk, {
      include: includeOption
    }).then((recordFound) => {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch((err) => {
      return res.serverError(err);
    });
  },


};
