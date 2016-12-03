"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "tag name",
    },
    isPositive: {
      field: "isPositive",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "is the tag has a positive meaning",
    },
    category: {
      field: "category",
      type: Sequelize.ENUM('course_review', 'article'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "category of the info the tag applies to",
    }
  },
  associations: function() {
    //course: m:n
    //review: m:n
  },
  options: {
    tableName: 'tag',
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
