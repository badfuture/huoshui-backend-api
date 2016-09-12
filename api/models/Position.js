/**
 * Position.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'position',
  attributes: {
    tableName: 'position',
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    profs: { // one to many
      collection: 'prof',
      via: 'position'
    }


  }
};
