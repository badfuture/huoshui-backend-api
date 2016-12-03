"use strict";

module.exports = {
  attributes: {
    shortname: {
      field: "shortname",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "dept name short form",
    },
    longname: {
      field: "longname",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "dept name long form",
    },
    alias: {
      field: "alias",
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "alternative names for dept",
    },
    //course : 1:n
  },
  associations: function() {
    Dept.belongsTo(School); // School: n:1
    Dept.hasMany(User); // User" 1:n
    //prof: m:n
  },
  options: {
    tableName: 'dept',
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
