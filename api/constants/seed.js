const path = require('path')

const path_app = sails.config.appPath

module.exports = {
  path_common: path_app + "/migration/data_common/",
  path_full: path_app + "/migration/data_full/",
  path_part: path_app + "/migration/data_part/",

  //common data
  file_position: "position.json",
  file_school: "school.json",
  file_tag: "tag.json",
  file_role: "role.json",
  file_prof: "prof.xls",

  //leancloud Data
  file_user: "_User.json",
  file_course: "Courses.json",
  file_review: "Reviews.json",
  file_liked_reviews: "_Join:Reviews:likedReviews:_User.json",
  file_disliked_reviews: "_Join:Reviews:dislikedReviews:_User.json",
  file_liked_Courses: "_Join:Courses:likedCourses:_User.json",
}
