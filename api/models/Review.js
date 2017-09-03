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
    meanHomework: {
      field: "meanHomework",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "作业多少，分高作业多"
    },
    meanAttend: {
      field: "meanAttend",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "点名多少，分高点名多"
    },
    meanBirdy: {
      field: "meanBirdy",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "课程水分，越高越水"
    },
    meanExam: {
      field: "meanExam",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "考试难度，越高越难"
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

    // custom timestamps
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "创建时间"
    },

    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "更新时间"
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
    }); //n:1

    Review.belongsTo(Prof, {
      as: 'Prof',
      foreignKey: 'prof_id'
    }); // n:1

    Review.belongsToMany(User, {
      as: 'LikedReviews',
      through: 'Join_User_LikedReviews_Review',
      foreignKey: 'review_id'
    }); // m:n
    Review.belongsToMany(User, {
      as: 'DislikedReviews',
      through: 'Join_User_DislikedReviews_Review',
      foreignKey: 'review_id'
    }); // m:n

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
        model: 'Join_Item_Tag',
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
    timestamps: false,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
