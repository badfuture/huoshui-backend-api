"use strict";

module.exports = {
  attributes: {
    jwtId: {
      field: "jwt_id",
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
      comment: "jwtId"
    },
    userId: {
      field: "user_id",
      type: Sequelize.TEXT,
      allowNull: false,
      unique: false,
      comment: "userId"
    },
    jwt: {
      field: "jwt",
      type: Sequelize.TEXT,
      allowNull: false,
      unique: false,
      comment: "jwt"
    },
    revoked: {
      field: "revoked",
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      unique: false,
      comment: "revoked"
    },
  },
  associations: function() {

  },
  options: {
    tableName: 'token',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
}
