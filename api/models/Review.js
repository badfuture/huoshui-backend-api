/**
 * Reviews.js
 *
 * @description :: all reviews and stats
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    school: { // many to one
      model: 'school',
      required: true
    },
    course: {
      model: 'course',
      required: true
    },
    author: {
      model: 'user',
      required: true
    },
    text: {
      type: 'text',
      required: true
        //minLength
    },
    downVote: {
      type: 'integer',
      min: 0
    },
    upVote: {
      type: 'integer',
      min: 0
    },
    comment: {
      collection: 'comment',
      via: 'thread'
    },

    //core stats
    professional: {
      type: 'integer',
      required: true,
      min: 0,
      max: 5
    },
    expressive: {
      type: 'integer',
      required: true,
      min: 0,
      max: 5
    },
    kind: {
      type: 'integer',
      required: true,
      min: 0,
      max: 5
    },

    //optional stats
    checkAttendance: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 5
    },
    lotsHomework: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 5
    },
    birdy: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 5
    },

    //exam related
    hasExam: {
      type: 'boolean',
      defaultsTo: null
    },
    examprep: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 5
    },
    openbook: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 5
    },
    oldquestion: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 5
    },
    easymark: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 5
    },

    //tags
    tags: { // many to many
      collection: 'tag',
      via: 'reviews',
      through: 'review_tag'
    }

  }
};
