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
      allowNull: true,
      defaultValue: 0,
      unique: false,
      validate: {min: 0},
      comment: "踩的计数器"
    },
    upVote: {
      field: "upVote",
      type: Sequelize.INTEGER,
      allowNull: true,
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

    // determine if is good review based on core stats
    classification: {
      field: "classification",
      type: Sequelize.ENUM('好评', '中评', '差评', '未知'),
      allowNull: true,
      defaultValue: '未知',
      unique: false,
      comment: "评论分级：好评，中评，差评，未知",
      get() {
        const professional = this.getDataValue('professional')
        const expressive = this.getDataValue('expressive')
        const kind = this.getDataValue('kind')
        return StatService.getReviewClassification({professional, expressive,kind})
      }
    },

    //optional stats
    rateHomework: {
      field: "rateHomework",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "作业多少，分高作业多"
    },
    rateAttend: {
      field: "rateAttend",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "点名多少，分高点名多"
    },
    rateBirdy: {
      field: "rateBirdy",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 5},
      comment: "课程水分，越高越水"
    },
    rateExam: {
      field: "rateExam",
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
      allowNull: true,
      defaultValue: Sequelize.NOW,
      unique: false,
      comment: "创建时间"
    },

    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
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
