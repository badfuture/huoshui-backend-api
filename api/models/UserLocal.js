"use strict";

module.exports = {
  attributes: {
    email: {
      field: "email",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
      comment: "邮箱"
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "密码"
    },
    salt: {
      field: "salt",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "密码盐"
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
    UserLocal.belongsTo(User, {
      as: 'User',
      foreignKey: {
        field: 'user_id'
      }
    }); // 1:1
  },
  options: {
    tableName: 'user_local',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {
      toJSON: function () {
        let values = Object.assign({}, this.get())
        delete values.password
        delete values.salt
        return values
      }
    },
    hooks: {
      beforeCreate: (userLocal, options) => {
        return AuthLocalService.hashPassword(userLocal)
      },
      beforeUpdate: (userLocal, options) => {
        return AuthLocalService.hashPassword(userLocal)
      }
    }
  }
}
