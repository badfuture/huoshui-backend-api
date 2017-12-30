/**
 * PositionController
 *
 * @description :: Server-side logic for managing positions
 */

module.exports = {
	find: (req,res) => {
    Position.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: ActionUtil.parsePopulate(req),
    }).then((recordsFound) => {
      return res.ok(recordsFound)
    }).catch((err) => {
      return res.serverError(err)
    })
  },

  findOne: (req,res) => {
    const pk = ActionUtil.requirePk(req)

    Position.findById(pk, {
      include: ActionUtil.parsePopulate(req),
    }).then((recordFound) => {
      if(!recordFound) return res.notFound('No record found with the specified `id`.')
      res.ok(recordFound)
    }).catch((err) => {
      return res.serverError(err)
    });
  },
};
