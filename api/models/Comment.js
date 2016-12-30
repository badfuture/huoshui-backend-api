"use strict";

module.exports = {
  attributes: {
    commentable: {
      field: "commentable",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "comment type, mapped to the commetable tables (ex.Post and Review)",
    },
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
    Comment.belongsTo(User, {
      as: 'Author',
      foreignKey: 'author_id',
    });  // n:1
    Comment.belongsTo(Review, {
      as: 'Review',
      foreignKey: 'review_id',
      constraints: false,
    });  // n:1
    Comment.belongsTo(Comment, {
      as: 'Parent',
      foreignKey: 'comment_id',
    }); // n:1
  },
  //TODO: thread: 1:n
  options: {
    tableName: 'comment',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {
      getItem: function() {
        return this['get' + this.get('commentable').substr(0, 1).toUpperCase() + this.get('commentable').substr(1)]();
      }
    },
    hooks: {}
  }
};
