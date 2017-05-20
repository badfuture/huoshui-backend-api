"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "nickname"
    },
    contact: {
      field: "contact",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "contact info (email, phone, qq, wechat)"
    },
    content: {
      field: "content",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "feedback content"
    }
  },
  associations: function() {
    Feedback.belongsTo(User, {
      as: 'User',
      foreignKey: 'user_id'
    }); // n:1
  },
  options: {
    tableName: 'feedback',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
