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
      allowNull: false,
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
    Course.hasOne(CourseStat) // courseStat: 1:1
    Course.hasMany(Review, {
      as: 'Reviews',
      foreignKey: 'course_id'
    }); // 1:n
    Course.belongsTo(School, {
      foreignKey: 'school_id',
      as: 'School'
    }); // n:1
    Course.belongsTo(Prof, {
      foreignKey: 'prof_id',
      as: 'Prof'
    }); // n:1
    Course.belongsTo(Elective, {
      foreignKey: 'elective_id',
      as: 'Elective'
    }); // n:1
    Course.belongsToMany(Tag, {
      as: 'Tags',
      through: 'course_tag',
      foreignKey: 'tag_id'
    }); // m:n
    Course.belongsToMany(Dept, {
      as: 'Depts',
      through: 'course_dept',
      foreignKey: 'dept_id'
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
