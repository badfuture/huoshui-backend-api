"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "课名"
    },
    isElective: {
      field: "isElective",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "是否选修"
    },
    audience: {
      field: "audience",
      type: Sequelize.ENUM('all_undergrad', 'general_edu'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "优选人群／课程性质"
    },
    homepage: {
      field: "homepage",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "课程主页"
    },
    textbook: {
      field: "textbook",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "课本"
    },
    credit: {
      field: "credit",
      type: Sequelize.DECIMAL(10, 2), //<==== what's this
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "学分"
    }
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
        model: 'JoinItemTag',
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

    //followers: m:n
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
