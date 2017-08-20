"use strict";

module.exports = {
  attributes: {
    seeded: {
      field: "seeded",
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      unique: false,
      comment: "初始数据是否已加载"
    }
  },
  associations: function() {

  },
  options: {
    tableName: 'meta',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {
    },
    hooks: {}
  }
};
