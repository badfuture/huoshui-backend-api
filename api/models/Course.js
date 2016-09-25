/**
 * Courses.js
 *
 * @description :: course model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'course',
  attributes: {
    school: { // many to one
      model: 'school',
      required: true
    },
    dept: { // many to one
      model: 'dept',
      required: false,
      defaultsTo: null
    },
    name: {
      type: 'string',
      required: true
    },
    prof: { // many to one
      model: 'prof',
      required: false,
      defaultsTo: null
      //required: true
    },
    homepage: { //good
      type: 'string',
      defaultsTo: null
    },
    textbook: { //good
      type: 'string',
      defaultsTo: null
    },
    credit: {
      type: 'float',
      defaultsTo: null
    },
    elective: { //many to one
      model: 'elective',
      defaultsTo: null
    },
    tags: { // many to many through course_tag join table
      collection: 'tag',
      via: 'courses',
      through: 'meta_course_tag'
    },
    stats: { // one to one
      model: 'courseStat',
      defaultsTo: null
    },
    reviews: { // one to many
      collection: 'review',
      via: 'course'
    },
    followers: { //many to many
      collection: 'user',
      via: 'followedCourses'
    }
  }
};
