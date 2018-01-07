"use strict";
const PROF_HOME = "http://202.115.71.132/servlet/TeacherHomepageAction?TeacherID="

module.exports = {
  attributes: {
    //personal info
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      exampleValue: "王英",
      unique: false,
      comment: "教师名字"
    },
    code: {
      field: "code",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "code1234",
      unique: false,
      comment: "教师编号，每个学校不同规则"
    },
    gender: {
      field: "gender",
      type: Sequelize.ENUM('男', '女'),
      allowNull: true,
      defaultValue: null,
      exampleValue: "男",
      unique: false,
      comment: "性别"
    },
    birth: {
      field: "birth",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      exampleValue: "1980",
      unique: false,
      validate: {min: 1930, max: 2010},
      comment: "生日"
    },
    hometown: {
      field: "hometown",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "武汉",
      unique: false,
      comment: "家乡"
    },
    motto: {
      field: "motto",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      exampleValue: "享受学习的过程，体会成功的幸福",
      unique: false,
      comment: "语录"
    },

    //contact info
    email: {
      field: "email",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "foo@email.com",
      unique: false,
      comment: "邮件"
    },
    phone: {
      field: "phone",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "6475228868",
      unique: false,
      comment: "电话"
    },
    officialSite: {
      field: "officialSite",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "http://ze.swjtu.com",
      unique: false,
      comment: "学校教师官网",
      get() {
        const code = this.getDataValue('code')
        if (code) {
          return PROF_HOME + code
        } else {
          return null
        }
      }
    },
    blog: {
      field: "blog",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "http://ze.blog.com",
      unique: false,
      comment: "博客"
    },

    //professional background
    exp: {
      field: "exp",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      exampleValue: 10,
      unique: false,
      validate: {min: 0, max: 100},
      comment: "教龄"
    },
    researchGroup: {
      field: "researchGroup",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      exampleValue: "疯狂研究组",
      unique: false,
      comment: "研究组"
    },

    intro: {
      field: "intro",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      exampleValue: "很长的个人介绍",
      unique: false,
      comment: "个人介绍"
    },
    education: {
      field: "education",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      exampleValue: "很长的教育背景",
      unique: false,
      comment: "教育背景"
    },
    research: {
      field: "research",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      exampleValue: "很长的研究背景",
      unique: false,
      comment: "研究背景"
    },
    achievement: {
      field: "achievement",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      exampleValue: "很长的教育成果",
      unique: false,
      comment: "教育成果"
    },

    // redundent stats (used to reduce # of api calls)
    scoreOverall: {
      field: "scoreOverall",
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      exampleValue: "综合评分",
      unique: false,
      validate: {min: 0, max: 5},
      comment: "综合评分"
    },

  },
  associations: function() {
    Prof.hasOne(ProfStat, {
      as: "Stat",
      foreignKey: 'prof_id'
    }); // 1:1
    Prof.belongsTo(School, {
      as: 'School',
      foreignKey: 'school_id'
    }); // n:1
    Prof.belongsTo(Position, {
      as: 'Position',
      foreignKey: 'position_id'
    }); // n:1

    Prof.hasMany(Course, {
      as: 'Courses',
      foreignKey: 'prof_id'
    }); // 1:n
    Prof.hasMany(Review, {
      as: 'Reviews',
      foreignKey: 'prof_id'
    }); // 1:n

    Prof.belongsToMany(User, {
      as: 'LikedUsers',
      through: 'Join_User_LikedProfs_Prof',
      foreignKey: 'prof_id'
    }); // m:n
    Prof.belongsToMany(Dept, {
      as: 'Depts',
      through: 'prof_dept',
      foreignKey: 'prof_id'
    }); // m:n
    Prof.belongsToMany(Tag, {
      as: 'Tags',
      through: {
        model: 'Join_Item_Tag',
        unique: false,
        scope: {
          taggable: 'prof'
        }
      },
      foreignKey: 'taggable_id',
      constraints: false
    }); // m:n
  },
  options: {
    tableName: 'prof',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
