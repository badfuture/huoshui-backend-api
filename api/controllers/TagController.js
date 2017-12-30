/**
 * TagController
 *
 * @description :: Server-side logic for managing Tags
 */

module.exports = {
	find: (req,res) => {
    Tag.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: [],
    }).then((recordsFound) => {
      return res.ok(recordsFound)
    }).catch((err) => {
      return res.serverError(err)
    });
  },

  findOne: function(req,res){
    const pk = ActionUtil.requirePk(req)

    Tag.findById(pk, {
      include: ActionUtil.parsePopulate(req)
    }).then((recordFound) => {
      if(!recordFound) return res.notFound('No record found with the specified `id`.')
      res.ok(recordFound);
    }).catch((err) => {
      return res.serverError(err)
    })
  },
};
