"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "用户角色"
    }
  },
  associations: function() {
    Role.belongsToMany(User, {
      as: 'Users',
      through: 'Join_User_Roles_Role',
      foreignKey: 'role_id'
    }); // m:n
  },
  options: {
    tableName: 'role',
    underscored: true,
    freezeTableName: true,
    timestamps: false,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
