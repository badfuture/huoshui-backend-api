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
    ReviewComment.belongsTo(User, {
      foreignKey: 'author_id',
      as: 'Author'
    });  // n:1
    ReviewComment.belongsTo(Review);  //thread: 1:n
    ReviewComment.belongsTo(Review, {
      foreignKey: 'review_id',
      as: 'Review'
    });  // n:1
    ReviewComment.belongsTo(ReviewComment, {
      foreignKey: 'review_comment_id',
      as: 'Parent'
    }); // n:1
  },
  options: {
    tableName: 'review_comment',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
