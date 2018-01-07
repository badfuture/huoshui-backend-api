const fs = require("fs")
const path = require('path')
const csv_parse = require('csv-parse/lib/sync')
const {
  path_common,
  path_full,
  path_part,

  //common data
  file_position,
  file_school,
  file_tag,
  file_prof,

  //leancloud Data
  file_user,
  file_course,
  file_review,
  file_liked_reviews,
  file_disliked_reviews,
  file_liked_Courses,
} = require('../constants/seed')

class seedData {
  constructor(env) {
    this.loadData(env)
  }

  loadData(env) {
    const path_data = (env === 'dev') ? path_part: path_full

    //common data
    const path_position = this._getPath(path_common, file_position)
    const path_school = this._getPath(path_common, file_school)
    const path_tag = this._getPath(path_common, file_tag)

    //unique Data
    const path_user = this._getPath(path_data, file_user)
    const path_prof = this._getPath(path_data, file_prof)
    const path_course = this._getPath(path_data, file_course)
    const path_review = this._getPath(path_data, file_review)
    const path_liked_reviews = this._getPath(path_data, file_liked_reviews)
    const path_disliked_reviews = this._getPath(path_data, file_disliked_reviews)
    const path_liked_Courses = this._getPath(path_data, file_liked_Courses)

    // load data
    this.school = this._readFile(path_school)
    this.dept = this.school[0].depts
    this.position = this._readFile(path_position)
    this.tag = this._readFile(path_tag)
    this.user = this._readFile(path_user)
    this.prof = this._readCSV(path_prof)
    this.course = this._readFile(path_course)
    this.review = this._readFile(path_review)
    this.likedCourse = this._readFile(path_liked_Courses)
    this.likedReview = this._readFile(path_liked_reviews)
    this.dislikedReview = this._readFile(path_disliked_reviews)
  }

  _getPath(filepath, filename) {
    return path.resolve(filepath, filename)
  }

  _readFile(filepath) {
    return JSON.parse(fs.readFileSync(filepath))
  }

  _readCSV(filepath) {
    const fileData= fs.readFileSync(filepath)
    let parsedData =  csv_parse(fileData, {columns: true}) // columns in the first line will be used as keys
    parsedData.splice(0, 2) // remove two addtional lines of header
    return parsedData
  }

}

module.exports = seedData
