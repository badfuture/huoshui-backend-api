/**
 * Offering.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    year: {
      type: 'int',
      max: 2020,
      min: 2000,
      required: true
    },
    season: {
      type: 'int',
      max: 4,
      min: 1,
      required: true
    },
    courses: {
      collection: 'course',
      via: 'offerings'
    }
  }
};
