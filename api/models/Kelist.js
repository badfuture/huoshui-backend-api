"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "课列名称"
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
    Kelist.belongsTo(User, {
      as: 'Author',
      foreignKey: 'user_id'
    }); // n:1

    Kelist.belongsToMany(Course, {
      as: 'courses',
      through: 'Join_Kelist_Courses_Course',
      foreignKey: 'kelist_id'
    }); // m:n

    Kelist.belongsToMany(User, {
      as: 'collectors',
      through: 'Join_Kelist_Collectors_User',
      foreignKey: 'kelist_id'
    }); // m:n

    /*
    TODO
    comments (rel: comment) 1:n
    tags (rel: tag) m:n
    */
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
