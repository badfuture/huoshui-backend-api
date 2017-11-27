
module.exports = {
  isReviewDuplicate: (userId, courseId) => {
    return User.findOne({
      where: {
        id: userId,
        '$Reviews.course_id$': courseId
      },
      include: [{
        model: Review,
        as: 'Reviews'
      }]
    }).then((userFound) => {
      if (userFound) {
        return true
      } else {
        return false
      }
    })
  }
}
