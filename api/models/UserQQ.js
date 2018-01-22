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
    isFirstAccount: {
      field: "isInitialized",
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      unique: false,
      comment: "是否为第一次注册的账户（该账户不能解除绑定）"
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
