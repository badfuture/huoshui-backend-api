/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 */

const Promise = require('bluebird')

module.exports = {

  find: (req,res) => {
    User.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: ActionUtil.parsePopulate(req)
    }).then(function(recordsFound){
      return res.ok(recordsFound)
    }).catch(function(err){
      return res.serverError(err)
    })
  },

  findOne: (req,res) => {
    const pk = ActionUtil.requirePk(req)
    User.findById(pk, {
      include: ActionUtil.parsePopulate(req)
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound)
    }).catch(function(err){
      return res.serverError(err)
    })
  },

  create: function(req,res){
    //handled in AuthLocalController.signup
  },

  updateBasic: function(req,res){
		const {
      username,
      email,
      firstYear,
      deptId,
      schoolId = '1'
    } = req.allParams()
    const user = req.user

		sails.log.debug(`updating user info for: ${user.id} | username ${user.username}`)

    User.findOne({
      where: { username }
    })
    .then((result) => {
      if (result && result.id != user.id) {
        return res.badRequest(ErrorCode.UsernameTaken)
      }
    })

    User.findOne({
      where: { email }
    })
    .then((result) => {
      if (result && result.id != user.id) {
        return res.badRequest(ErrorCode.EmailTaken)
      }
    })

		return user.update({
			username, email, firstYear,
      dept_id: deptId, school_id: schoolId
		})
    .then(() => {
			return res.ok("user updated")
		})
  },

  update: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var pk = ActionUtil.requirePk(req);
    var values = ActionUtil.parseValues(req);

    // Omit the path parameter `id` from values, unless it was explicitly defined
    // elsewhere (body/query):
    var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
    if (!idParamExplicitlyIncluded) delete values.id;

    if (typeof values[Model.primaryKey] !== 'undefined') {
      req._sails.log.warn('Cannot change primary key via update blueprint; ignoring value sent for `' + Model.primaryKey + '`');
    }
    delete values[Model.primaryKey];

    Model.findById(pk).then(function(matchingRecord) {

      if (!matchingRecord) return res.notFound();

      Model.update(values, { where: { id: pk }}).then(function(records) {
        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(util.format('Unexpected output from `%s.update`.', Model.globalId));
        }

        var updatedRecord = pk;

        var Q = Model.findById(updatedRecord, {include: req._sails.config.blueprints.populate ? [{ all: true }] : []})
        .then(function(populatedRecord) {
          if (!populatedRecord) return res.serverError('Could not find record after updating!');
          res.ok(populatedRecord);
        }).catch(function(err){
          return res.serverError(err);
        });
      }).catch(function(err){
        return res.negotiate(err);
      });
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  destroy: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var pk = ActionUtil.requirePk(req);

    Model.findById(pk, { include: req._sails.config.blueprints.populate ? [{ all: true }] : []})
    .then(function(record) {
      if(!record) return res.notFound('No record found with the specified `id`.');
      Model.destroy({ where: { id: pk }}).then(function() {
        return res.ok(record);
      }).catch(function(err){
        return res.negotiate(err);
      });
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  /**
   * Upload avatar for currently logged-in user
   * (POST /user/avatar)
   */
  uploadAvatar: (req, res) => {
    const imgDir = require('path').resolve(sails.config.appPath, '.tmp/images')
    sails.log.debug('UserController: avatar upload local path', imgDir)

    const userId = req.user ? req.user.id : null
    const uuid = require('node-uuid')
    const filename = `u/${userId}/avatar_${uuid.v1()}.jpg`
    sails.log.debug('UserController: avatar filename', filename)

    req.file('avatar').upload({
      dirname: imgDir,
      maxBytes: 5000000, // limit upload size to ~5MB
      saveAs: (__newFileStream, next) => {
        return next(undefined, filename)
      }
    },function whenDone(err, files) {
      if (err) {
        return res.negotiate(err)
      }
      if (files.length === 0){
        return res.badRequest(ErrorCode.UploadFileEmpty)
      }

      localPath = files[0].fd
      sails.log.debug('UserController: avatar local path', localPath)

      ObjectStorageService
      .upload(filename, localPath)
      .then((resp) => {
        ObjectStorageService.refreshCdn(filename)
        return UserService.getUserFullInfo(userId)
      })
      .then((userFound) => {
        userFound.update({
          avatar: filename
        })
        .then(() => {
          return res.created(userFound)
        })
      })
      .catch((err) => {
        res.serverError(err)
      })
    })
  },

  likeCourse: (req, res) => {
    sails.log.debug("UserController likeCourse")
    const { userId, courseId } = ActionUtil.parseValues(req)
    Promise.all([
      User.findById(userId),
      Course.findById(courseId),
    ]).then(([userFound, courseFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!courseFound) {
        return res.badRequest(ErrorCode.CourseNotFound)
      } else {
        return userFound.addLikedCourses(courseFound)
        .then(() => {
          return res.ok('course added to user collection')
        })
      }
    })
  },

  unlikeCourse: (req, res) => {
    sails.log.debug("UserController unlikeCourse")
    const { userId, courseId } = ActionUtil.parseValues(req)
    Promise.all([
      User.findById(userId),
      Course.findById(courseId)
    ]).then(([userFound, courseFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!courseFound) {
        return res.badRequest(ErrorCode.CourseNotFound)
      } else {
        return userFound.removeLikedCourses(courseFound)
        .then(() => {
          return res.ok('course removed from user collection')
        })
      }
    })
  },

  likeProf: (req, res) => {
    sails.log.debug("UserController likeProf")
    const { userId, profId } = ActionUtil.parseValues(req)
    Promise.all([
      User.findById(userId),
      Prof.findById(profId)
    ]).then(([userFound, profFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!profFound) {
        return res.badRequest(ErrorCode.ProfNotFound)
      } else {
        return userFound.addLikedProfs(profFound)
        .then(() => {
          return res.ok('prof added to user collection')
        })
      }
    })
  },

  unlikeProf: (req, res) => {
    sails.log.debug("UserController unlikeProf")
    const { userId, profId } = ActionUtil.parseValues(req)
    Promise.all([
      User.findById(userId),
      Prof.findById(profId)
    ]).then(([userFound, profFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!profFound) {
        return res.badRequest(ErrorCode.ProfNotFound)
      } else {
        return userFound.removeLikedProfs(profFound)
        .then(() => {
          return res.ok('prof removed from user collection')
        })
      }
    })
  },

  likeReview: (req, res) => {
    sails.log.debug('UserController: likeReview')
    const { userId, reviewId } = ActionUtil.parseValues(req)

    if (!userId || !reviewId) {
      res.badRequest(ErrorCode.BadRequest)
    }

    Promise.all([
      User.findById(userId),
      Review.findById(reviewId),
    ]).then(([userFound, reviewFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!reviewFound) {
        return res.badRequest(ErrorCode.ReviewNotFound)
      } else {
        Promise.all([
          userFound.getLikedReviews({
            where: { id: reviewId }
          }),
          userFound.getDislikedReviews({
            where: { id: reviewId }
          }),
        ]).then(([likedReviews, dislikedReviews]) => {
          if (likedReviews.length != 0) {
            return res.badRequest(ErrorCode.LikeOrDislikeReviewTwice)
          } else if (dislikedReviews.length != 0) {
            return res.badRequest(ErrorCode.CannotBothLikeAndDislikeReview)
          }
          reviewFound.increment({'upVote': 1})
          .then(() => {
            return userFound.addLikedReviews(reviewFound)
          })
          .then(() => {
            return res.ok('review added to user collection: LikedReviews')
          })
        })
      }
    })
  },

  unlikeReview: (req, res) => {
    sails.log.debug('UserController: unlikeReview')
    const { userId, reviewId } = ActionUtil.parseValues(req)

    if (!userId || !reviewId) {
      res.badRequest(ErrorCode.BadRequest)
    }

    Promise.all([
      User.findById(userId),
      Review.findById(reviewId),
    ]).then(([userFound, reviewFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!reviewFound) {
        return res.badRequest(ErrorCode.ReviewNotFound)
      } else {
        Promise.all([
          userFound.getLikedReviews({
            where: { id: reviewId }
          }),
          userFound.getDislikedReviews({
            where: { id: reviewId }
          }),
        ]).then(([likedReviews, dislikedReviews]) => {
          if (likedReviews.length == 0) {
            return res.badRequest(ErrorCode.CannotUnlikeOrUndislike)
          } else if (dislikedReviews.length != 0) {
            return res.badRequest(ErrorCode.LikeOrDislikeReviewTwice)
          }
          reviewFound.decrement({'upVote': 1})
          .then(() => {
            return userFound.removeLikedReviews(reviewFound)
          })
          .then(() => {
            return res.ok('review removed from user collection: LikedReviews')
          })
        })
      }
    })
  },

  dislikeReview: (req, res) => {
    sails.log.debug('UserController: dislikeReview')
    const { userId, reviewId } = ActionUtil.parseValues(req)

    if (!userId || !reviewId) {
      res.badRequest(ErrorCode.BadRequest)
    }

    Promise.all([
      User.findById(userId),
      Review.findById(reviewId),
    ]).then(([userFound, reviewFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!reviewFound) {
        return res.badRequest(ErrorCode.ReviewNotFound)
      } else {
        Promise.all([
          userFound.getLikedReviews({
            where: { id: reviewId }
          }),
          userFound.getDislikedReviews({
            where: { id: reviewId }
          }),
        ]).then(([likedReviews, dislikedReviews]) => {
          if (likedReviews.length != 0) {
            return res.badRequest(ErrorCode.CannotBothLikeAndDislikeReview)
          } else if (dislikedReviews.length != 0) {
            return res.badRequest(ErrorCode.LikeOrDislikeReviewTwice)
          }
          reviewFound.increment({'downVote': 1})
          .then(() => {
            return userFound.addDislikedReviews(reviewFound)
          })
          .then(() => {
            return res.ok('review added to user collection: DislikedReviews')
          })
        })
      }
    })
  },

  undislikeReview: (req, res) => {
    sails.log.debug('UserController: undislikeReview')
    const { userId, reviewId } = ActionUtil.parseValues(req)

    if (!userId || !reviewId) {
      res.badRequest(ErrorCode.BadRequest)
    }

    Promise.all([
      User.findById(userId),
      Review.findById(reviewId),
    ]).then(([userFound, reviewFound]) => {
      if (!userFound) {
        return res.badRequest(ErrorCode.UserNotFound)
      } else if (!reviewFound) {
        return res.badRequest(ErrorCode.ReviewNotFound)
      } else {
        Promise.all([
          userFound.getLikedReviews({
            where: { id: reviewId }
          }),
          userFound.getDislikedReviews({
            where: { id: reviewId }
          }),
        ]).then(([likedReviews, dislikedReviews]) => {
          if (likedReviews.length != 0) {
            return res.badRequest(ErrorCode.CannotBothLikeAndDislikeReview)
          } else if (dislikedReviews.length == 0) {
            return res.badRequest(ErrorCode.CannotUnlikeOrUndislike)
          }
          reviewFound.decrement({'downVote': 1})
          .then(() => {
            return userFound.removeDislikedReviews(reviewFound)
          })
          .then(() => {
            return res.ok('review removed from user collection: DislikedReviews')
          })
        })
      }
    })
  },
};
