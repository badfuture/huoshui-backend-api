"use strict";

module.exports = {
  attributes: {
    count: {
      field: "count",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: false,
      comment: "counter of how many tags are applied to a course",
    },
  },
  associations: function() {
  },
  options: {
    tableName: 'course_tag',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
