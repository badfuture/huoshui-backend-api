/**
 * Electiveness.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  table: "electiveness",
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    courses: {
      collection: 'course',
      via: 'electiveness'
    }
  }
};
