/**
 * School.js (DONE)
 *
 * @description :: school model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'school',
  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    dept: { //one to many
      collection: 'dept',
      via: 'school'
    },
    campus: {
      type: 'string',
      defaultsTo: null
    }
  }
};
