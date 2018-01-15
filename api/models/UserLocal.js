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
        return LocalAuthService.hashPassword(userLocal)
      },
      beforeUpdate: (userLocal, options) => {
        return LocalAuthService.hashPassword(userLocal)
      }
    }
  }
}
