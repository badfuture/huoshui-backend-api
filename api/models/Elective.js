"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "type of elective",
    }
  },
  associations: function() {
    Elective.hasMany(Course, {
      as: 'Courses',
      foreignKey: 'elective_id',
    }); // 1:n
  },
  options: {
    tableName: 'elective',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
