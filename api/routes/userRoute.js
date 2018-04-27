
module.exports = {
  // get user info
  'GET /users': {
    model: "user",
    controller: "UserController",
    action: "find",
    isPlural: true,
    swagger: {}
  },
  'GET /users/:id': {
    model: "user",
    controller: "UserController",
    action: "findOne",
    isPlural: false,
    swagger: {}
  },

  // update user info
  'PATCH /user': {
    model: "user",
    controller: "UserController",
    action: "updateBasic",
    isPlural: false,
    swagger: {}
  },

  // upload avatar
  'POST /user/avatar': {
    model: "user",
    controller: "UserController",
    action: "uploadAvatar",
    isPlural: false,
    swagger: {}
  },
  // like and unlike course
  'PUT /users/:userId/liked_courses': {
    model: "user",
    controller: "UserController",
    action: "likeCourse",
  },
  'DELETE /users/:userId/liked_courses/:courseId': {
    model: "user",
    controller: "UserController",
    action: "unlikeCourse",
  },

  // like and unlike prof
  'PUT /users/:userId/liked_profs': {
    model: "user",
    controller: "UserController",
    action: "likeProf",
  },
  'DELETE /users/:userId/liked_profs/:profId': {
    model: "user",
    controller: "UserController",
    action: "unlikeProf",
  },

  // like and unlike review
  'PUT /users/:userId/liked_reviews': {
    model: "user",
    controller: "UserController",
    action: "likeReview",
  },
  'DELETE /users/:userId/liked_reviews/:reviewId': {
    model: "user",
    controller: "UserController",
    action: "unlikeReview",
  },

  // dislike and undislike review
  'PUT /users/:userId/disliked_reviews': {
    model: "user",
    controller: "UserController",
    action: "dislikeReview",
  },
  'DELETE /users/:userId/disliked_reviews/:reviewId': {
    model: "user",
    controller: "UserController",
    action: "undislikeReview",
  },

  // collect and uncollect kelist
  'PUT /users/:userId/collected_kelists/:kelistId': {
    model: "user",
    controller: "UserController",
    action: "collectKelist",
  },
  'DELETE /users/:userId/collected_kelists/:kelistId': {
    model: "user",
    controller: "UserController",
    action: "uncollectKelist",
  },
}
