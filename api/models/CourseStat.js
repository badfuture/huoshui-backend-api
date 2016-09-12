/**
 * Stat.js
 *
 * @description :: stats model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'courseStat',
  attributes: {
    school: { // many to one
      model: 'school',
      required: true
    },
    course: { // one to one
      collection: 'course',
      via: 'stats'
    },
    followerCount: {
      type: 'int',
      defaultsTo: 0,
      min: 0
    },
    rate1: {
      type: 'float',
      required: true,
      min: 0,
      max: 5
    },
    rate2: {
      type: 'float',
      required: true,
      min: 0,
      max: 5
    },
    rate3: {
      type: 'float',
      required: true,
      min: 0,
      max: 5
    },
    rateOverall: {
      type: 'float',
      required: true,
      min: 0,
      max: 5
    },
    countReview: {
      type: 'integer',
      min: 0
    },
    countGoodReview: {
      type: 'integer',
      min: 0
    },
    countHomework: {
      type: 'integer',
      min: 0
    },
    rateHomework: {
      type: 'float',
      min: 0,
      max: 5
    },
    countAttend: {
      type: 'integer',
      min: 0
    },
    rateAttend: {
      type: 'float',
      min: 0,
      max: 5
    },
    countExam: {
      type: 'integer',
      min: 0
    },
    rateExam: {
      type: 'float',
      min: 0,
      max: 5
    },
    countBird: {
      type: 'integer',
      min: 0
    },
    rateBird: {
      type: 'float',
      min: 0,
      max: 5
    }
  }
};
