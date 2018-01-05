var fs = require("fs")
let path_common = sails.config.appPath + "/migration/data_common/"
let path_leancloud_full = sails.config.appPath + "/migration/data_full/"
let path_leancloud = path_leancloud_full
let file_review = "Reviews.json"

let reviewData = JSON.parse(fs.readFileSync(path_leancloud + file_review))

module.exports = {
  checkReviewDuplicate: (req, res) => {
    sails.log.debug("Checking duplicate reviews ...")
    let dupResults = []
    let reviews = reviewData.results
    reviews.forEach((review, currentPos) => {
      let firstPos = reviews.map((e) => {
        return e.comment
      }).indexOf(review.comment)
      if (firstPos !== currentPos) {
        orig = reviews[firstPos]
        dup = reviews[currentPos]
        if (orig.courseName === dup.courseName ) {
          sails.log.debug(`Orig: authorId ${orig.authorId.objectId}`)
          sails.log.debug(`Orig: courseName ${orig.courseName}`)
          sails.log.debug(`Orig: text ${orig.comment}`)
          sails.log.debug(`Dup: authorId ${dup.authorId.objectId}`)
          sails.log.debug(`Dup: courseName ${dup.courseName}`)
          sails.log.debug(`Dup: text ${dup.comment}`)

          dupResults.push({
            courseName: orig.courseName,
            text: orig.comment
          })
        }
      }
    })
    res.ok(dupResults)
  }
}
