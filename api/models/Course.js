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
    name: {
      type: 'string',
      required: true
    },
    prof: { // many to one
      model: 'prof',
      required: true
    },
    dept: { // many to one
      model: 'dept',
      required: true
    },
    offeringYear: {
      type: 'int',
      max: 2020,
      min: 2000,
      required: true
    },
    offeringSeason: {
      type: 'int',
      max: 4,
      min: 1,
      required: true
    },
    homepage: { //good
      type: 'string',
      defaultsTo: ''
    },
    textbook: { //good
      type: 'string',
      defaultsTo: ''
    },
    credit: {
      type: 'float',
      defaultsTo: 0
    },
    electiveness: { //many to one
      model: 'electiveness',
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
