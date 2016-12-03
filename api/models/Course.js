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
    Course.hasMany(Review); // reviews: 1:n
    Course.belongsTo(School); // school: n:1
    Course.belongsTo(Prof); // prof: n:1
    Course.belongsTo(Elective); // elective: n:1

    Course.hasOne(CourseStat) // courseStat: 1:1

    //dept: m:n
    //tags: m:n
    //followers: m:n
  },
  options: {
    tableName: 'course',
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
