var fs = require("fs")
let path_common = sails.config.appPath + "/migration/data_common/"
let path_leancloud_full = sails.config.appPath + "/migration/data_raw_full/"
let path_leancloud = path_leancloud_full
let file_review = "Reviews.json"

let reviewData = JSON.parse(fs.readFileSync(path_leancloud + file_review))

module.exports = {
  checkReviewDuplicate: (req, res) => {
    sails.log.debug("Checking duplicate reviews ...")
    let reviews = reviewData.results
    reviews.forEach((review, currentPos) => {
      let firstPos = reviews.map((e) => {
        return e.comment
      }).indexOf(review.comment)
      if (firstPos !== currentPos) {
        original = reviews[firstPos]
        dup = reviews[currentPos]
        sails.log.debug(`Original: authorId ${original.authorId.objectId}`)
        sails.log.debug(`Original: courseName ${original.courseName}`)
        sails.log.debug(`Original: text ${original.comment}`)
        sails.log.debug(`Duplicate: authorId ${dup.authorId.objectId}`)
        sails.log.debug(`Duplicate: courseName ${dup.courseName}`)
        sails.log.debug(`Duplicate: text ${dup.comment}`)
      }
    })
    res.ok('duplicate checking complete!')
  }
}
