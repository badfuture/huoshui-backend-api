/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 */

module.exports = {
  find: (req,res) => {
    School.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: ActionUtil.parsePopulate(req),
    }).then(function(recordsFound){
      return res.ok(recordsFound)
    }).catch(function(err){
      return res.serverError(err)
    });
  },

  findOne: (req,res) => {
    const pk = ActionUtil.requirePk(req)

    School.findById(pk, {
      include: ActionUtil.parsePopulate(req),
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound)
    }).catch(function(err){
      return res.serverError(err)
    })
  },

  create: (req,res) => {
    const data = ActionUtil.parseValues(req)
    School.create(data).then((newRecord) => {
       res.created(newRecord)
    }).catch(function(err){
       return res.serverError(err)
    })
  },
}
