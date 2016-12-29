"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "course name",
    },
    homepage: {
      field: "homepage",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "course homepage",
    },
    textbook: {
      field: "textbook",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "course textbook",
    },
    credit: {
      field: "credit",
      type: Sequelize.DECIMAL(10, 2), //<==== what's this
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "course credit",
    }
  },
  associations: function() {
    Course.hasOne(CourseStat, {
      as: "Stat",
      foreignKey: 'course_id',
    }); // courseStat: 1:1
    Course.hasMany(Review, {
      as: 'Reviews',
      foreignKey: 'course_id',
    }); // 1:n
    Course.belongsTo(School, {
      as: 'School',
      foreignKey: 'school_id',
    }); // n:1
    Course.belongsTo(Prof, {
      as: 'Prof',
      foreignKey: 'prof_id',
    }); // n:1
    Course.belongsTo(Elective, {
      as: 'Elective',
      foreignKey: 'elective_id',
    }); // n:1
    Course.belongsToMany(Tag, {
      as: 'Tags',
      through: 'JoinCourseTag',
      foreignKey: 'course_id',
    }); // m:n
    Course.belongsToMany(Dept, {
      as: 'Depts',
      through: 'JoinCourseDept',
      foreignKey: 'course_id',
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
