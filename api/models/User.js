/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    school: {
      model: 'school',
      required: true
    },
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    salt: {
      type: 'string',
      defaultsTo: null
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    avatar: {
      type: 'string',
      defaultsTo: null
    },
    firstYear: {
      type: 'integer',
      defaultsTo: 2016,
      min: 2000,
      max: 2020
    },
    myReviews: { // one to many
      collection: 'review',
      via: 'author'
    },
    likedReviews: { // one to many
      collection: 'review',
      via: 'author'
    },
    dislikedReviews: { // one to many
      collection: 'review',
      via: 'author'
    },
    followedCourses: { // one to many
      collection: 'course',
      via: 'followers'
    },
    dept: { // many to one
      model: 'dept',
      defaultsTo: null
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeUpdate: function(values, next) {
    CipherService.hashPassword(values);
    next();
  },
  beforeCreate: function(values, next) {
    CipherService.hashPassword(values);
    next();
  }
};
