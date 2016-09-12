/**
 * Tag.js
 *
 * @description :: tag model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tag',
  attributes: {
    name: {
      type: "string",
      required: true
    },
    isPositive: {
      type: "boolean",
      required: null
    },
    type: {
      type: "string",
      enum: ["course_review","article"],
      required: true
    },
    courses: {
      collection: "course",
      via: "tags",
      through: "course_tag"
    },
    reviews: {
      collection: "review",
      via: "tags",
      through: "review_tag"
    }
  }
};
