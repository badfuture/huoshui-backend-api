/**
 * PositionController
 *
 * @description :: Server-side logic for managing positions
 */

module.exports = {
	find: (req,res) => {
    Kelist.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: ActionUtil.parsePopulate(req),
    }).then(function(recordsFound){
      return res.ok(recordsFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    const pk = ActionUtil.requirePk(req)

    Kelist.findById(pk, {
      include: ActionUtil.parsePopulate(req)
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

	create: function(req,res){
		const { name, description, isPublic} = ActionUtil.parseValues(req)
		const user = req.user
    let kelistCreated = null;

    Kelist.create({
      name,
      description,
      isPublic
    }).then((newKelist)=> {
      kelistCreated = newKelist;
      user.addOwnsKelists(kelistCreated)
    }).then(()=> {
      return Kelist.findOne({
        where: {id: kelistCreated.id},
        include: [{model: User, as: 'Author'}]
      })
    }).then((results)=> {
      return res.created(results);
    }).catch((err)=> {
      return res.negotiate(err);
    });
	}
};
