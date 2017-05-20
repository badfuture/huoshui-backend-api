"use strict";

module.exports = {
  attributes: {
    commentable: {
      field: "commentable",
      type: Sequelize.ENUM('review', 'kelist'),
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "被评论对象的类型"
    },
    text: {
      field: "text",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "文字内容"
    },
    datePosted: {
      field: "datePosted",
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      unique: false,
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
    Comment.hasMany(Comment, {
      as: 'Subcomments',
      foreignKey: 'parent_id',
      constraints: false
    });  // n:1
  },
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
