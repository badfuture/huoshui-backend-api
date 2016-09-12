/**
 * Review_tag.js
 *
 * @description :: join table for review & tag
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'review_tag',
  attributes: {
    review: {
      model: 'review',
      required: true
    },
    tag: {
      model: 'tag',
      required: true
    },
    count: {
      type: 'integer',
      min: 0
    }
  }
};
