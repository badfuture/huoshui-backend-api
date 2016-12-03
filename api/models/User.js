"use strict";

module.exports = {
  attributes: {
    username: {
      field: "username",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "username",
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "password",
    },
    salt: {
      field: "salt",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "salt for password",
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "email",
    },
    firstYear: {
      field: "firstYear",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: { min: 2000, max: 2020},
      comment: "the year admitted to the school",
    },
  },
  associations: function() {
    User.belongsTo(School);
    User.belongsTo(Dept);
    User.hasMany(Review);//myReviews: 1:n
    User.hasMany(ReviewComment); //ReviewComment: 1:n

    //TODO
    //major
    //likedReviews: 1:n
    //dislikedReviews: 1:n
    //followedCourses: n:m
  },
  options: {
    tableName: 'user',
    freezeTableName: true,
    classMethods: {},
    instanceMethods: {},
    validate: {},
    hooks: {}
  }
};
