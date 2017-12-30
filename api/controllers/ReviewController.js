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
  find: (req,res) => {
    const queryParams = {
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: ActionUtil.parsePopulate(req),
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

  findOne: (req,res) => {
    const pk = ActionUtil.requirePk(req)
    const includes = ActionUtil.parsePopulate(req)
    const sort = ActionUtil.parseSort(req) || [
      [{ model: Comment, as: 'Comments'}, 'datePosted', 'DESC'],
      [{ model: Comment, as: 'Comments'}, {model: Comment, as: 'Subcomments'}, 'datePosted', 'DESC']
    ]

    Review.findById(pk, {
      include: includes,
      order: OrderService.validateOrder(includes, 'Reviews') ? sort : null
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      recordFound.set('Comments', getNormalizedComments(recordFound.Comments))
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  create: (req,res) => {
    const {
      courseId, professional, expressive, kind, text,
      tags, rateHomework, rateAttend, rateBirdy, rateExam,
      examprep, openbook, oldquestion, easymark
    } = ActionUtil.parseValues(req)

    // parse tags into array
    if (typeof tags === 'string') {
      tagsArr = tags.replace(/\[|\]| /g, '')
      tagsArr = (tagsArr) ? tagsArr.split(',') : []
    } else {
      tagsArr = tags
    }

    let userId = req.user ? req.user.id : null
    let newReview = null
    let course = null

    // bad request if required params not found
    if (!courseId || !professional || !expressive || !kind || !text) {
      return res.badRequest('courseId, professional, expressive, kind, text fields are required')
    }

    // determine if hasExam based on rateExam
    let hasExam = (rateExam >= 1) ? true: false

    // check if course was reviewed before
    ReviewService
      .isReviewDuplicate(userId, courseId)
      .then((isDuplicate) => {
        if (isDuplicate) {
          res.badRequest('User can only review the same course once')
        } else {
          // create new review and set asscoiations for:
          // course, prof, user
          Review.create({
            text,
            professional, expressive, kind,
            rateHomework, rateAttend, rateBirdy, rateExam,
            hasExam, examprep, openbook, oldquestion, easymark
          }).then((newRecord) => {
            newReview = newRecord
          }).then(() => {
            return newReview.setAuthor(userId)
          }).then(() => {
            return Course
              .findOne({where: {id: courseId}})
              .then((courseFound) => {
                course = courseFound
                courseFound.addReview(newReview)
              })
          }).then(() => {
            return course
              .getProf()
              .then((profFound) => {
                profFound.addReview(newReview)
              })
          }).then(() => {
            return newReview.setTags(tagsArr)
          }).then(() => {
            res.created()
          }).catch((err) => {
            return res.serverError(err)
          })
        }
      })
  },
};
