/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 */

module.exports = {
	find: function(req,res){
    var defaultInclude = [
      { model: User, as: 'Author'},
    ];
		var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Comment.findAll({
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
    var defaultInclude = [
      { model: User, as: 'Author'},
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    Comment.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

	create: (req, res) => {
    const {commentable, commentableId, text, authorId, parentId} = ActionUtil.parseValues(req)
    let newComment = null
		let Model = req._sails.models[commentable]

    // return if the comment is malformed
    if (!commentable || !commentableId || !text || !authorId) {
      return res.badRequest('commentable, commentableId, text and authorId fields are required')
    }

		if (parentId != null && parentId != '') {
      // commenting on an existing comment
			return Comment
				.findOne({where: {id: parentId}})
				.then((commentFound) => {
					// forbid commenting on a subcomment
					if (commentFound && !commentFound.parent_id) {
						Comment.create({
							commentable,
							text,
						}).then((newRecord) => {
							newComment = newRecord
							commentFound.addSubcomment(newComment)
						}).then(() => {
							return User
								.findOne({where: {id: authorId}})
								.then((userFound) => {
									userFound.addComment(newComment)
								})
						}).then(() => {
							return Model
								.findOne({where: {id: commentableId}})
								.then((commentableFound) => {
									commentableFound.addComment(newComment)
								})
						}).then(() => {
							res.created()
						}).catch((err) => {
				      return res.serverError(err)
				    })
					} else {
						return res.badRequest('cannot comment on a subcomment')
					}
				})
		} else {
      // create a new first level comment
			Comment.create({
	      commentable,
				text,
	    }).then((newRecord) => {
				newComment = newRecord
			}).then(() => {
				return User
	        .findOne({where: {id: authorId}})
	        .then((userFound) => {
	          userFound.addComment(newComment)
	        })
			}).then(() => {
	      return Model
	        .findOne({where: {id: commentableId}})
	        .then((commentableFound) => {
	          commentableFound.addComment(newComment)
	        })
			}).then(() => {
	      res.created()
	    }).catch((err) => {
	      return res.serverError(err)
	    })
		}
  },
};
