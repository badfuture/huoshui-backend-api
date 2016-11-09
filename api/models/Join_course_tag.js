/**
 * Course_tag.js
 *
 * @description :: join table for course & tag (TBDs)
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'joint_course_tag',
  attributes: {
    course: {
      model: 'course',
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
