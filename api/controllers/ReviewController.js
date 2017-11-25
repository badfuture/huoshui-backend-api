/**
 * ReviewsController
 *
 * @description :: Server-side logic for managing Review
 */

const getNormalizedComments = (comments) => {
   let subcommentsIdArr = []
   if (!comments) return false
   comments.forEach((comment) => {
     let subcomments = comment.Subcomments
     if (subcomments) {
       subcomments.forEach((subcomment) => {
         subcommentsIdArr.push(subcomment.id)
       })
     }
   })
   return comments.filter((comment) => {
     let isDuplicate = (subcommentsIdArr.indexOf(comment.id) > -1)
     return !isDuplicate
   })
}


module.exports = {
  find: function(req,res){
    let defaultInclude = [
      { model: Course, as: 'Course'},
      { model: Tag, as: 'Tags'}
    ];
    let includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    const queryParams = {
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: includeOption,
      distinct: true
    }

    const isPaginateFormat =  ActionUtil.parsePaginate(req);

    if (isPaginateFormat) {
      Review.findAndCountAll(queryParams)
      .then((result) => {
        result.rows.forEach((record) => {
          if (record.Comments)
            return record.set('Comments', getNormalizedComments(record.Comments))
        })
        return res.ok(result);
      }).catch((err) => {
        return res.serverError(err);
      })
    } else {
      Review.findAll(queryParams)
      .then(function(recordsFound){
        recordsFound.forEach((record) => {
          if (record.Comments)
            return record.set('Comments', getNormalizedComments(record.Comments))
        })
        return res.ok(recordsFound);
      }).catch(function(err){
        return res.serverError(err);
      })
    }

  },

  findOne: function(req,res){
    var pk = ActionUtil.requirePk(req);
    var defaultInclude = [
      { model: Course, as: 'Course'},
      { model: Comment, as: 'Comments',
        separate: false,
        include: [{
          model: Comment,
          as: 'Subcomments',
          separate: false,
          include: [
            { model: User, as: 'Author',
              attributes: {
                exclude: ['password', 'salt']
              }
            },
          ]
        }, {
          model: User,
          as: 'Author',
          attributes: {
            exclude: ['password', 'salt']
          }
        }]
      },
      { model: User, as: 'Author',
        attributes: {
          exclude: ['password', 'salt']
        }
      },
      { model: Tag, as: 'Tags'}
    ];

    Review.findById(pk, {
      include: ActionUtil.parsePopulate(req, defaultInclude),
      order: ActionUtil.parseSort(req) || [
        [{ model: Comment, as: 'Comments'}, 'datePosted', 'DESC'],
        [{ model: Comment, as: 'Comments'}, {model: Comment, as: 'Subcomments'}, 'datePosted', 'DESC']
      ],
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      recordFound.set('Comments', getNormalizedComments(recordFound.Comments))
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  create: (req,res) => {
    const {courseId, professional, expressive, kind, text} = ActionUtil.parseValues(req)
    let userId = 1
    let profId = 1
    // add asscoiation
    // course, prof, user

    let newReview = null

    if (!courseId || !professional || !expressive || !kind || !text) {
      return res.badRequest('courseId, professional, expressive, kind, text fields are required')
    }
    Review.create({
      text,
      professional,
      expressive,
      kind,
    }).then((newRecord) => {
      newReview = newRecord
    }).then(() => {
      return User
        .findOne({where: {id: userId}})
        .then((userFound) => {
          userFound.addReview(newReview)
        })
    }).then(() => {
      return Course
        .findOne({where: {id: courseId}})
        .then((courseFound) => {
          courseFound.addReview(newReview)
        })
    }).then(() => {
      return Prof
        .findOne({where: {id: profId}})
        .then((profFound) => {
          profFound.addReview(newReview)
        })
      }).then(() => {
	      res.created()
	    }).catch((err) => {
	      return res.serverError(err)
	    })

  },
};
