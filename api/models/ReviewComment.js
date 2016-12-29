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
      as: 'Author',
      foreignKey: 'author_id',
    });  // n:1
    ReviewComment.belongsTo(Review, {
      as: 'Review',
      foreignKey: 'review_id',
    });  // n:1
    ReviewComment.belongsTo(ReviewComment, {
      as: 'Parent',
      foreignKey: 'comment_id',
    }); // n:1
  },
  //TODO: thread: 1:n
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
