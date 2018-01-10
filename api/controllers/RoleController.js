/**
 * RoleController
 *
 * @description :: Server-side logic for managing Roles
 */

module.exports = {
	find: (req,res) => {
    Role.findAll({
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

    Role.findById(pk, {
      include: {}
    }).then((recordFound) => {
      if(!recordFound) return res.notFound('No record found with the specified `id`.')
      res.ok(recordFound);
    }).catch((err) => {
      return res.serverError(err)
    })
  },
};
