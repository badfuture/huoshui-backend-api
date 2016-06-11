/**
 * Dept.js (DONE)
 *
 * @description :: Depart model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    school: { // many to one
      model: 'school',
      required: true
    },
    shortname: {
      type: 'string',
      required: true
    },
    longname: {
      type: 'string',
      required: true
    },
    courses: { // one to many
      collection: 'course',
      via: 'dept'
    }
  }
};
