/**
 * DeptController
 *
 * @description :: Server-side logic for managing Depts
 */

module.exports = {
	find: (req,res) => {
    Dept.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req) || [['id', 'ASC']],
      include: ActionUtil.parsePopulate(req),
    }).then((recordsFound) => {
      return res.ok(recordsFound)
    }).catch((err) => {
      return res.serverError(err)
    })
  },

  findOne: function(req,res){
    const pk = ActionUtil.requirePk(req)

    Dept.findById(pk, {
      include: ActionUtil.parsePopulate(req),
    }).then((recordFound) => {
      if(!recordFound) return res.notFound('No record found with the specified `id`.')
      res.ok(recordFound)
    }).catch((err) => {
      return res.serverError(err)
    })
  },

}
