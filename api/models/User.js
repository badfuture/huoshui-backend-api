"use strict";

module.exports = {
  attributes: {
    username: {
      field: "username",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "用户名"
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "密码"
    },
    salt: {
      field: "salt",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "密码盐"
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "邮箱"
    },
    firstYear: {
      field: "firstYear",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: { min: 2000, max: 2020},
      comment: "入学年份"
    },
  },
  associations: function() {
    User.belongsTo(School, {
      as: 'School',
      foreignKey: 'school_id'
    }); // n:1
    User.belongsTo(Role, {
      as: 'Role',
      foreignKey: 'role_id'
    }); // n:1
    User.belongsTo(Dept, {
      as: 'Dept',
      foreignKey: 'dept_id'
    }); // n:1
    User.hasMany(Review, {
      as: 'Reviews',
      foreignKey: 'author_id'
    }); // 1:n
    User.hasMany(Comment, {
      as: 'Comments',
      foreignKey: 'user_id'
    }); // 1:n

    //likedReviews: 1:n
    //dislikedReviews: 1:n
    //followedCourses: n:m => need to change this to personal course list
  },
  options: {
    tableName: 'user',
    underscored: true,
    freezeTableName: true,
    classMethods: {},
    instanceMethods: {},
    validate: {},
    hooks: {
      beforeCreate: function(user, options) {
        return CipherService.hashPassword(user);
      },
      beforeUpdate: function(user, options) {
        return CipherService.hashPassword(user);
      }
    }
  }
};
