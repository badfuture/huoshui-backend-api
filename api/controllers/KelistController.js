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

	addToKelist: async function(req, res) {
		const { courseId, briefComment, id } = ActionUtil.parseValues(req)
		const user = req.user

    if (!courseId) {
      return res.badRequest(ErrorCode.InvalidOrMissingParams)
    }

		let kelist
		kelist = await Kelist.findById(id)
		if (!kelist) {
			res.notFound(ErrorCode.NotFound)
		} else {
      let coursesFound = null
      coursesFound = await kelist.getCourses({where: { id: courseId}})
      if (coursesFound.length < 1) {
        await kelist.addCourses(courseId, { through: { brief_comment: briefComment }})
        return res.created("Course added to kelist")
      } else {
        return res.badRequest(ErrorCode.KelistCourseAlreadyAdded)
      }
		}
	},

  removeFromKelist: async function(req, res) {
		const { courseId, id } = ActionUtil.parseValues(req)
		const user = req.user

    if (!courseId) {
      return res.badRequest(ErrorCode.InvalidOrMissingParams)
    }

    let kelist = null
    kelist = await Kelist.findById(id)
    if (kelist) {
      await kelist.removeCourses(courseId)
      return res.created("Course added to kelist")
    } else {
      return res.notFound(ErrorCode.NotFound)
    }
  },

	deleteKelist: async function(req, res) {
		const { id } = ActionUtil.parseValues(req)
		const user = req.user

		let result
    try {
      result = await Kelist.destroy({
				where: { id }
			})
    } catch(e) {
			sails.log.error(e)
      return res.badRequest(ErrorCode.DeleteFailed)
    }
    return res.ok("Kelist deleted successfully!")
	},
}
