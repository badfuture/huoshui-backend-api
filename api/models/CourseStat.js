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
    rateOverall: {
      field: "rateOverall",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "综合评分"
    },

    //secondary stats
    rateHomework: {
      field: "rateHomework",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "作业多少，分高作业多"
    },
    rateAttend: {
      field: "rateAttend",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "点名多少，分高点名多"
    },
    rateExam: {
      field: "rateExam",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "考试难度，越高越难"
    },
    rateBird: {
      field: "rateBird",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "课程水分，越高越水"
    },

    //counters
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
    countExam: {
      field: "countExam",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "考试评论次数"
    },
    countBird: {
      field: "countBird",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "水课评论次数"
    }
  },
  associations: function() {
    CourseStat.belongsTo(Course, {
      as: 'Course',
      foreignKey: {
        field: 'course_id'
        //allowNull: false,
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
