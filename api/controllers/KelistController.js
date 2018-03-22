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

  updateKelist: async function(req, res) {
		const { id, name, description, isPublic } = ActionUtil.parseValues(req)
    let kelist = await Kelist.findById(id)

    // return if default kelist
    if (kelist.category == 'default_liked_courses') {
			return res.badRequest(ErrorCode.CannotModifyDefaultKelist)
		}

		await kelist.update({
			name, description, isPublic
		})
		return res.ok("Kelist updated")
  },

	create: async function(req,res){
		const { name, description, isPublic=false } = ActionUtil.parseValues(req)
		const user = req.user
    let kelistCreated = null;

    // bad request if required params not found
    if (!name) {
      return res.badRequest(ErrorCode.KelistRequiredFieldMissing)
    }
    kelistCreated = await Kelist.create({
      name,
      description,
      isPublic
    })
    await user.addOwnsKelists(kelistCreated)
    await kelistCreated.reload({
      include: [{model: User, as: 'Author'}]
    })
    return res.created(kelistCreated)
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
