/**
 * Stat.js
 *
 * @description :: stats model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'courseStat',
  attributes: {
    course: { // one to one
      collection: 'course',
      via: 'stats'
    },
    professional: {
      type: 'float',
      min: 0,
      max: 5
    },
    expressive: {
      type: 'float',
      min: 0,
      max: 5
    },
    kind: {
      type: 'float',
      min: 0,
      max: 5
    },
    rateOverall: {
      type: 'float',
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
    },
    followerCount: {
      type: 'int',
      defaultsTo: 0,
      min: 0
    },
  }
};
