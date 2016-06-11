/**
 * Profs.js (done)
 *
 * @description :: prof model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    school: { // many to one
      model: 'school',
      required: true
    },
    name: { //good
      type: 'string',
      required: true
    },
    email: { //good
      type: 'string',
      defaultsTo: ''
    },
    homepage: { //good
      type: 'string',
      defaultsTo: ''
    },
    position: { //good
      model: 'position',
      defaultsTo: null
    },
    courses: { // one to many
      collection: 'course',
      via: 'prof'
    }
  }
};
