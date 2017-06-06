/**
 * PositionController
 *
 * @description :: Server-side logic for managing positions
 */

module.exports = {
	find: function(req,res){
    var defaultInclude = [];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Kelist.findAll({
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
    var defaultInclude = [];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Kelist.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

	create: function(req,res){
		var data = ActionUtil.parseValues(req);
    var name = data.name;
    var author_id = data.author_id;
    var description = data.description;
    var coverImage = data.coverImage;
    var category = data.category;
    var kelistCreated = null;

    // return if try to create a default kelist
    if (category === 'default_liked_courses') {
      return res.badRequest('The default kelist is created on user registration');
    }

    Kelist.create({
      name: name,
      description: description,
      coverImage: coverImage
    }).then((newKelist)=> {
      kelistCreated = newKelist;
      return User.findOne({where:{id: author_id}})
      .then((userFound)=> {
        return userFound.addOwnsKelists(kelistCreated);
      })
    }).then(()=> {
      return Kelist.findOne({
        where: {id: kelistCreated.id},
        include: [{model: User, as: 'Author',
          attributes: {exclude: ['password', 'salt']}
        }]
      });
    }).then((results)=> {
      return res.created(results);
    }).catch((err)=> {
      return res.negotiate(err);
    });
	}
};
