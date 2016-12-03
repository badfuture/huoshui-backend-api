"use strict";

module.exports = {
  attributes: {
    text: {
      field: "text",
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "review text body",
    },
    downVote: {
      field: "downVote",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "# of down vote",
    },
    upVote: {
      field: "upVote",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "# of up vote",
    },

    //core stats
    professional: {
      field: "professional",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof professional",
    },
    expressive: {
      field: "expressive",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof expressive",
    },
    kind: {
      field: "kind",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the prof kind",
    },

    //optional stats
    checkAttendance: {
      field: "checkAttendance",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "does the prof check attendance",
    },
    lotsHomework: {
      field: "lotsHomework",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "does the prof assign lots of homework",
    },
    birdy: {
      field: "birdy",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "is the course birdy",
    },

    //exam related
    hasExam: {
      field: "hasExam",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "does the course has exam",
    },
    examprep: {
      field: "examprep",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "does the course has examprep",
    },
    openbook: {
      field: "openbook",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "is the course open book",
    },
    oldquestion: {
      field: "oldquestion",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "does exam contain old question",
    },
    easymark: {
      field: "easymark",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "does exam contain easy question",
    },


  },
  associations: function() {
    Review.belongsTo(Course);//course: n:1
    Review.belongsTo(User);//author: n:1
    Review.hasMany(ReviewComment);//comment: 1:n

    //tag: m:n
  },
  options: {
    tableName: 'review',
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
