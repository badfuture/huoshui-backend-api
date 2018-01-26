"use strict";

module.exports = {
  attributes: {
    //core stats
    professional: {
      field: "professional",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "专业"
    },
    expressive: {
      field: "expressive",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "表达"
    },
    kind: {
      field: "kind",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "友好"
    },
    scoreOverall: {
      field: "scoreOverall",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "综合评分"
    },

    //secondary stats
    meanHomework: {
      field: "meanHomework",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "作业多少，分高作业多"
    },
    meanAttend: {
      field: "meanAttend",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "点名多少，分高点名多"
    },
    meanBirdy: {
      field: "meanBirdy",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "课程水分，越高越水"
    },
    meanExam: {
      field: "meanExam",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "考试难度，越高越难"
    },

    //secondary counters
    countReview: {
      field: "countReview",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "总评论次数"
    },
    countGoodReview: {
      field: "countGoodReview",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "好评次数"
    },
    countAverageReview: {
      field: "countAverageReview",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "average review count"
    },
    countBadReview: {
      field: "countBadReview",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "bad review count"
    },
    countHomework: {
      field: "countHomework",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "作业评论次数"
    },
    countAttend: {
      field: "countAttend",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "点名评论次数"
    },
    countBirdy: {
      field: "countBirdy",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "水课评论次数"
    },
    countExam: {
      field: "countExam",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "考试评论次数"
    },

    //exam details stats
    countExamDetails: {
      field: "countExamDetails",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "考试细节（开卷，原题，划重点，题目容易）评论次数"
    },
    countExamPrepYes: {
      field: "countExamPrepYes",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "划重点 次数"
    },
    countExamPrepNo: {
      field: "countExamPrepNo",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "不 划重点 次数"
    },
    countExamOpenbookYes: {
      field: "countExamOpenbookYes",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "开卷 次数"
    },
    countExamOpenbookNo: {
      field: "countExamOpenbookNo",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "不 开卷 次数"
    },
    countExamOldquestionYes: {
      field: "countExamOldquestionYes",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "原题 次数"
    },
    countExamOldquestionNo: {
      field: "countExamOldquestionNo",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "不是 原题 次数"
    },
    countExamEasymarkYes: {
      field: "countExamEasymarkYes",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "题目容易 次数"
    },
    countExamEasymarkNo: {
      field: "countExamEasymarkNo",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "非 题目容易 次数"
    },

    // Tag stats
    countNetGoodTag: {
      field: "countNetGoodTag",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      comment: "好的标签 - 坏的标签"
    },
    countGoodTag: {
      field: "countGoodTag",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "好的标签"
    },
    countBadTag: {
      field: "countBadTag",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "坏的标签"
    },
  },
  associations: function() {
    CourseStat.belongsTo(Course, {
      as: 'Course',
      foreignKey: {
        field: 'course_id'
      }
    }); // 1:1
  },
  options: {
    tableName: 'course_stat',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
