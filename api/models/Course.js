"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      exampleValue: "大学计算机基础A",
      unique: false,
      comment: "课名"
    },
    isElective: {
      field: "isElective",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      exampleValue: false,
      unique: false,
      comment: "是否选修"
    },
    audience: {
      field: "audience",
      type: Sequelize.ENUM('all_undergrad', 'general_edu'),
      allowNull: true,
      defaultValue: null,
      exampleValue: 'all_undergrad',
      unique: false,
      comment: "优选人群／课程性质"
    },
    homepage: {
      field: "homepage",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "http://somecourses.org/1",
      unique: false,
      comment: "课程主页"
    },
    textbook: {
      field: "textbook",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "算法入门",
      unique: false,
      comment: "课本"
    },
    credit: {
      field: "credit",
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
      exampleValue: 1.00,
      unique: false,
      comment: "学分"
    },

    // redundent stats (used to reduce # of api calls)
    scoreOverall: {
      field: "scoreOverall",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      exampleValue: 2.556,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "综合评分"
    },
  },
  associations: function() {
    Course.hasOne(CourseStat, {
      as: "Stat",
      foreignKey: 'course_id'
    }); // courseStat: 1:1
    Course.hasMany(Review, {
      as: 'Reviews',
      foreignKey: 'course_id'
    }); // 1:n
    Course.belongsTo(School, {
      as: 'School',
      foreignKey: 'school_id'
    }); // n:1
    Course.belongsTo(Prof, {
      as: 'Prof',
      foreignKey: 'prof_id'
    }); // n:1
    Course.belongsToMany(Tag, {
      as: 'Tags',
      through: {
        model: 'Join_Item_Tag',
        unique: false,
        scope: {
          taggable: 'course'
        }
      },
      foreignKey: 'taggable_id',
      constraints: false
    }); // m:n
    Course.belongsToMany(Dept, {
      as: 'Depts',
      through: 'JoinCourseDept',
      foreignKey: 'course_id'
    }); // m:n
    Course.belongsToMany(Kelist, {
      as: 'Kelists',
      through: 'Join_Kelist_Courses_Course',
      foreignKey: 'course_id'
    }); // m:n
  },
  options: {
    tableName: 'course',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
