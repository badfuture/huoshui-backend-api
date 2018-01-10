"use strict";

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  associations: function() {
  },
  options: {
    tableName: 'Join_User_Roles_Role',
    underscored: true,
    freezeTableName: true,
    timestamps: false,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
