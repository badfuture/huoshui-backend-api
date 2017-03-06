"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "课列名称"
    },
    category: {
      field: "category",
      type: Sequelize.ENUM('default_liked_courses'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "标签的类型"
    },
    description: {
      field: "description",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "课列介绍"
    },
    coverImage: {
      field: "coverImage",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "封面图片"
    },
    countCourse: {
      field: "countCourse",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "课列包含课程个数"
    },
    countView: {
      field: "countView",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "点击次数"
    }
  },
  associations: function() {
    Kelist.hasMany(Comment, {
      as: 'Comments',
      foreignKey: 'kelist_id',
      constraints: false,
      scope: {
        commentable: 'kelist'
      }
    }); // 1:n
    Kelist.belongsTo(User, {
      as: 'Author',
      foreignKey: 'author_id'
    }); // n:1
    Kelist.belongsToMany(User, {
      as: 'Collectors',
      through: 'Join_Kelist_Collectors_User',
      foreignKey: 'kelist_id'
    }); // m:n
    Kelist.belongsToMany(Course, {
      as: 'Courses',
      through: 'Join_Kelist_Courses_Course',
      foreignKey: 'kelist_id'
    }); // m:n
    Kelist.belongsToMany(Tag, {
      as: 'Tags',
      through: {
        model: 'Join_Item_Tag',
        unique: false,
        scope: {
          taggable: 'kelist'
        }
      },
      foreignKey: 'taggable_id',
      constraints: false
    }); // m:n
  },
  options: {
    tableName: 'kelist',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
