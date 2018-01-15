"use strict";

module.exports = {
  attributes: {
    providerId: {
      field: "provider_id",
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      comment: "qq openid"
    },
  },
  associations: function() {
    UserQQ.belongsTo(User, {
      as: 'User',
      foreignKey: {
        field: 'user_id'
      }
    }); // 1:1
  },
  options: {
    tableName: 'user_qq',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
