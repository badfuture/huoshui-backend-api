module.exports = {
  NotAuthorized: {
    code: 'NotAuthorized',
    type: 'Authorization',
    message: 'Not authorized to perform intended action. Make sure you have the correct permission'
  },
  NotAuthenticated: {
    code: 'NotAuthenticated',
    type: 'Authentication',
    message: 'Missing or invalid authentication token'
  },
  EmailTaken: {
    code: "EmailTaken",
    type: "Authentication",
    message: "Email has already been used"
  },
  UsernameTaken: {
    code: "UsernameTaken",
    type: "Authentication",
    message: "Username has already been used"
  },
  BadRequest: {
    code: "BadRequest",
    type: "BadRequest",
    message: "The request is invalid. Double check the params used in the request"
  },
  InvalidOrMissingParams: {
    code: "InvalidOrMissingParams",
    type: "BadRequest",
    message: "The request is invalid. Double check the params used in the request"
  },
  CannotUnlikeOrUndislike: {
    code: "CannotUnlikeOrUndislike",
    type: "BadRequest",
    message: "Cannot unlike or undislike a review if it is not liked or disliked in the first place"
  },
  LikeOrDislikeReviewTwice: {
    code: "LikeOrDislikeReviewTwice",
    type: "BadRequest",
    message: "The request is invalid. Cannot like or dislike the same review twice"
  },
  BindSameAccountTypeTwice: {
    code: "BindSameAccountTypeTwice",
    type: "BadRequest",
    message: "Cannot bind multiple social accounts of the same type to a user"
  },
  KelistRequiredFieldMissing: {
    code: "KelistRequiredFieldMissing",
    type: "BadRequest",
    message: "name of Kelist is required"
  },
  ReviewRequiredFieldMissing: {
    code: "ReviewRequiredFieldMissing",
    type: "BadRequest",
    message: "courseId, professional, expressive, kind, text fields are required"
  },
  ReviewSameCourseTwice: {
    code: "ReviewSameCourseTwice",
    type: "BadRequest",
    message: "User can only review the same course once"
  },
  SearchQueryParamMissing: {
    code: "SearchQueryParamMissing",
    type: "BadRequest",
    message: "query parameter is required"
  },
  DatabaseAlreadySeeded: {
    code: "DatabaseAlreadySeeded",
    type: "BadRequest",
    message: "Database is seeding or has already been seeded!"
  },
  SeedModeNotRecognized: {
    code: "SeedModeNotRecognized",
    type: "BadRequest",
    message: "Seeding needs to be in either 'dev' or 'prod' mode!"
  },
  CannotCommentOnSubcomment: {
    code: "CannotCommentOnSubcomment",
    type: "BadRequest",
    message: "Cannot comment on a subcomment. Only two level of commenting is allowed"
  },
  UploadFileEmpty: {
    code: "UploadFileEmpty",
    type: "BadRequest",
    message: "Cannot upload empty file"
  },
  CannotBothLikeAndDislikeReview: {
    code: "CannotBothLikeAndDislikeReview",
    type: "BadRequest",
    message: "Cannot both like and dislike a review"
  },
  FeedbackContentMissing: {
    code: "FeedbackContentMissing",
    type: "BadRequest",
    message: "Feedback content cannot be empty"
  },
  CannotCreateDefaultKelist: {
    code: "CannotCreateDefaultKelist",
    type: "BadRequest",
    message: "Default Kelist can only be created during user registration"
  },
  NotFound: {
    code: "NotFound",
    type: "NotFound",
    message: "The resource requested is not found"
  },
  UserNotFound: {
    code: "UserNotFound",
    type: "NotFound",
    message: "The user is not found"
  },
  ReviewNotFound: {
    code: "ReviewNotFound",
    type: "NotFound",
    message: "The review is not found"
  },
  CourseNotFound: {
    code: "CourseNotFound",
    type: "NotFound",
    message: "The course is not found"
  },
  BlacklistTokenNotFound: {
    code: "BlacklistTokenNotFound",
    type: "NotFound",
    message: "Cannot find the token to be blacklisted"
  },
}
