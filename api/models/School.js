"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "school name",
    },
    campus: {
      field: "campus",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "school campus",
    }
  },
  associations: function() {
    School.hasMany(User, {
      foreignKey: 'school_id',
      as: 'Users'
    }); // 1:n
    School.hasMany(Course, {
      foreignKey: 'school_id',
      as: 'Courses'
    }); // 1:n
    School.hasMany(Dept, {
      foreignKey: 'school_id',
      as: 'Depts'
    }); // 1:n
    School.hasMany(Prof, {
      foreignKey: 'school_id',
      as: 'Profs'
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
