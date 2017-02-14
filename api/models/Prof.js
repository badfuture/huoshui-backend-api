"use strict";

module.exports = {
  attributes: {
    //personal info
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "教师名字"
    },
    code: {
      field: "code",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "教师编号，每个学校不同规则"
    },
    gender: {
      field: "gender",
      type: Sequelize.ENUM('male', 'female'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "性别"
    },
    birth: {
      field: "birth",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 1930, max: 2010},
      comment: "生日"
    },
    hometown: {
      field: "hometown",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "家乡"
    },
    motto: {
      field: "motto",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "语录"
    },

    //contact info
    email: {
      field: "email",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "邮件"
    },
    phone: {
      field: "phone",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "电话"
    },
    homepage: {
      field: "homepage",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "主页"
    },

    //professional background
    exp: {
      field: "exp",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 100},
      comment: "教龄"
    },
    researchGroup: {
      field: "researchGroup",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "研究组"
    },

    intro: {
      field: "intro",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "个人介绍"
    },
    education: {
      field: "education",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "教育背景"
    },
    research: {
      field: "research",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "研究背景"
    },
    achievement: {
      field: "achievement",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "教育成果"
    },
    pastCourses: {
      field: "pastCourses",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "过去课程"
    }
  },
  associations: function() {
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
    Prof.belongsToMany(Dept, {
      as: 'Depts',
      through: 'prof_dept',
      foreignKey: 'prof_id'
    }); // m:n
    Prof.belongsToMany(Tag, {
      as: 'Tags',
      through: {
        model: 'JoinItemTag',
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
