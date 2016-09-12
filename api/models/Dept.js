/**
 * Dept.js (DONE)
 *
 * @description :: Depart model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'dept',
  attributes: {
    school: { // many to one
      model: 'school',
      required: true
    },
    shortname: {
      type: 'string',
      unique: true,
      required: true
    },
    longname: {
      type: 'string',
      unique: true,
      required: true
    },
    courses: { // one to many
      collection: 'course',
      via: 'dept'
    }
  }
};
