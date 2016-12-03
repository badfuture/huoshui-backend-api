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
    School.hasMany(User); //User: 1:n

  },
  options: {
    tableName: 'school',
    freezeTableName: true,
    classMethods: {},
    instanceMethods: {},
    validate: {},
    hooks: {}
  }
};
