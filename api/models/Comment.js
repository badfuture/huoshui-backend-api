/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    thread: {
      model: 'review',
      required: true
    },
    parent: {
      model: 'comment',
      defaultsTo: null
    },
    datePosted: {
      type: 'date',
      defaultsTo: new Date()
    },
    author: {
      model: 'user',
      required: true
    },
    text: {
      type: 'text',
      required: true
    }
  }
};
