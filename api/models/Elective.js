"use strict";

module.exports = {
  attributes: {
    type: {
      field: "type",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "type of elective",
    }

  },
  associations: function() {
    Elective.hasMany(Course); //course: 1:n
  },
  options: {
    tableName: 'elective',
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
