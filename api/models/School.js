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
