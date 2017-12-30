
const UserInclude = require('./IncludeService/UserInclude')
const CourseInclude = require('./IncludeService/CourseInclude')
const ProfInclude = require('./IncludeService/ProfInclude')
const ReviewInclude = require('./IncludeService/ReviewInclude')
const CommentInclude = require('./IncludeService/CommentInclude')
const DeptInclude = require('./IncludeService/DeptInclude')
const FeedbackInclude = require('./IncludeService/FeedbackInclude')
const KelistInclude = require('./IncludeService/KelistInclude')
const PositionInclude = require('./IncludeService/PositionInclude')
const SchoolInclude = require('./IncludeService/SchoolInclude')
const TagInclude = require('./IncludeService/TagInclude')


module.exports ={
  // populate include option for User model
  UserInclude,
  CourseInclude,
  ProfInclude,
  ReviewInclude,
  CommentInclude,
  FeedbackInclude,
  KelistInclude,
  PositionInclude,
  SchoolInclude,
  TagInclude,
}
