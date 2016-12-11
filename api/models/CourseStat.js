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
      comment: "is the prof professional",
    },
    expressive: {
      field: "expressive",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof expressive",
    },
    kind: {
      field: "kind",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof kind",
    },
    rateOverall: {
      field: "rateOverall",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof kind",
    },

    //secondary stats
    rateHomework: {
      field: "rateHomework",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof kind",
    },
    rateAttend: {
      field: "rateAttend",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof kind",
    },
    rateExam: {
      field: "rateExam",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof kind",
    },
    rateBird: {
      field: "rateBird",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof kind",
    },

    //counters
    countReview: {
      field: "countReview",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "is the prof kind",
    },
    countGoodReview: {
      field: "countGoodReview",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "is the prof kind",
    },
    countHomework: {
      field: "countHomework",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "is the prof kind",
    },
    countAttend: {
      field: "countAttend",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "is the prof kind",
    },
    countExam: {
      field: "countExam",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "is the prof kind",
    },
    countBird: {
      field: "countBird",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "is the prof kind",
    }
  },
  associations: function() {
    CourseStat.belongsTo(Course); // 1:1
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
