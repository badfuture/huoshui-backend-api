/**
 * PositionController
 *
 * @description :: Server-side logic for managing Kelists
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
		const { name, description, isPublic=false } = ActionUtil.parseValues(req)
		const user = req.user
    let kelistCreated = null;

    // bad request if required params not found
    if (!name) {
      return res.badRequest(ErrorCode.KelistRequiredFieldMissing)
    }

		// randomly assign cover image
		let coverImage = ''
		const Domain = require('../constants/domain.js')
		const OS_URL = Domain.OBJECT_STORAGE
		const MAX = 5
		const MIN = 1
    const img_num = Math.floor(Math.random() * (MAX - MIN)) + MIN
    coverImage = `${OS_URL}/site/images/pattern/pattern${img_num}.jpg`

    Kelist.create({
      name,
      description,
      coverImage,
      isPublic
    }).then((newKelist)=> {
      kelistCreated = newKelist;
      return user.addOwnsKelists(kelistCreated)
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
	},

	addToKelist: function(req, res) {
		const { courseId, briefComment, id } = ActionUtil.parseValues(req)
		const user = req.user

    // bad request if required params not found
    if (!courseId) {
      return res.badRequest(ErrorCode.InvalidOrMissingParams)
    }

    Kelist.findById(id)
    .then((result) => {
      if (!result) {
        return res.notFound(ErrorCode.NotFound)
      }
      return result.addCourses(courseId, { through: { brief_comment: briefComment }})
    })
    .then(() => {
      res.created("Course added to kelist")
    })
	}
};
