"use strict";

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
    tableName: '_JoinCourseTag',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
