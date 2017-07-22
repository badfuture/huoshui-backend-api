"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      exampleValue: "西南交通大学",
      unique: "indexNameCampus",
      comment: "校名"
    },
    campus: {
      field: "campus",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "犀浦",
      unique: "indexNameCampus",
      comment: "校区"
    }
  },
  associations: function() {
    School.hasMany(User, {
      as: 'Users',
      foreignKey: 'school_id',
    }); // 1:n
    School.hasMany(Course, {
      as: 'Courses',
      foreignKey: 'school_id',
    }); // 1:n
    School.hasMany(Dept, {
      as: 'Depts',
      foreignKey: 'school_id',
    }); // 1:n
    School.hasMany(Prof, {
      as: 'Profs',
      foreignKey: 'school_id',
    }); // 1:n
  },
  options: {
    tableName: 'school',
    underscored: true,
    freezeTableName: true,
    classMethods: {},
    instanceMethods: {},
    validate: {},
    hooks: {}
  }
};
