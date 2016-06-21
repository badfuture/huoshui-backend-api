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
      required: false
    },
    username: {
      type: 'string',
      required: false,
      unique: true
    },
    password: {
      type: 'string',
      required: false
    },
    salt: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: false,
      unique: true
    },
    avatar: {
      type: 'string',
      defaultsTo: ''
    },
    year: {
      type: 'integer',
      defaultsTo: 2015,
      min: 2000,
      max: 2020
    },
    myReviews: {
      collection: 'review',
      via: 'author'
    },
    likedReviews: {
      collection: 'review',
      via: 'author'
    },
    dislikedReviews: {
      collection: 'review',
      via: 'author'
    },
    followedCourses: {
      collection: 'course',
      via: 'followers'
    },
    dept: {
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
