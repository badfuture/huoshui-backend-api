"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "role name",
    }
    //ACL
  },
  associations: function() {
    Role.hasMany(User, {
      as: 'Users',
      foreignKey: 'role_id',
    }); // 1:n
  },
  options: {
    tableName: 'role',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
