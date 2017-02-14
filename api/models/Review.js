"use strict";

module.exports = {
  attributes: {
    text: {
      field: "text",
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "点评正文"
    },
    downVote: {
      field: "downVote",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "踩的计数器"
    },
    upVote: {
      field: "upVote",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "赞的计数器"
    },

    //core stats
    professional: {
      field: "professional",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "专业"
    },
    expressive: {
      field: "expressive",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "表达"
    },
    kind: {
      field: "kind",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "友好"
    },

    //optional stats
    checkAttendance: {
      field: "checkAttendance",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "点名"
    },
    lotsHomework: {
      field: "lotsHomework",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "作业"
    },
    birdy: {
      field: "birdy",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "水分"
    },

    //exam related
    hasExam: {
      field: "hasExam",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "是否有考试"
    },
    examprep: {
      field: "examprep",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "划重点"
    },
    openbook: {
      field: "openbook",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "开卷"
    },
    oldquestion: {
      field: "oldquestion",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "原题"
    },
    easymark: {
      field: "easymark",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "题目容易"
    },
  },
  associations: function() {
    Review.belongsTo(Course, {
      as: 'Course',
      foreignKey: 'course_id'
    }); // n:1
    Review.belongsTo(User, {
      as: 'Author',
      foreignKey: 'author_id'
    }); //author: n:1
    Review.hasMany(Comment, {
      as: 'Comments',
      foreignKey: 'review_id',
      constraints: false,
      scope: {
        commentable: 'review'
      }
    }); // 1:n
    Review.belongsToMany(Tag, {
      as: 'Tags',
      through: {
        model: 'JoinItemTag',
        unique: false,
        scope: {
          taggable: 'review'
        }
      },
      foreignKey: 'taggable_id',
      constraints: false
    }); // m:n
  },
  options: {
    tableName: 'review',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
