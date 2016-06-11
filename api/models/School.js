/**
 * School.js (DONE)
 *
 * @description :: school model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { //good
      type: 'string',
      required: true,
      unique: true
    },
    dept: { //one to many
      collection: 'dept',
      via: 'school'
    },
    campus: {
      type: 'string',
      defaultsTo: ''
    },
    users: {
      collection: 'user',
      via: 'school'
    }
  }
};
