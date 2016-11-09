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
      required: true
    },
    type: {
      type: "string",
      enum: ["course_review","article"],
    },
    courses: {
      collection: "course",
      via: "tags",
      through: "join_course_tag"
    },
    reviews: {
      collection: "review",
      via: "tags"
    }
  }
};
