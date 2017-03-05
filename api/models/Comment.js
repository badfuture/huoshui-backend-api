"use strict";

module.exports = {
  attributes: {
    commentable: {
      field: "commentable",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "评论类型，对应其它可被评价的表 (ex.Post and Review)"
    },
    text: {
      field: "text",
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "文字内容"
    },
    datePosted: {
      field: "datePosted",
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      unique: true,
      comment: "发布日期"
    }
  },
  associations: function() {
    Comment.belongsTo(User, {
      as: 'Author',
      foreignKey: 'author_id'
    });  // n:1
    Comment.belongsTo(Review, {
      as: 'Review',
      foreignKey: 'review_id',
      constraints: false
    });  // n:1
    Comment.belongsTo(Kelist, {
      as: 'Kelist',
      foreignKey: 'kelist_id',
      constraints: false
    });  // n:1
    Comment.belongsTo(Comment, {
      as: 'Parent',
      foreignKey: 'comment_id'
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
