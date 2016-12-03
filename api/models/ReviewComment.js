"use strict";

module.exports = {
  attributes: {
    text: {
      field: "text",
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "comment text body",
    },
    datePosted: {
      field: "datePosted",
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      unique: true,
      comment: "date comment was posted",
    }
  },
  associations: function() {
    ReviewComment.belongsTo(User);  //author: n:1
    ReviewComment.belongsTo(Review);  //thread: 1:n
    //ReviewComment.belongsTo(ReviewComment) //parent: 1:n

  },
  options: {
    tableName: 'review_comment',
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
