"use strict";

module.exports = {
  attributes: {
    username: {
      field: "username",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: 'uniqueUserProvider',
      comment: "用户名"
    },
    provider: {
      field: "provider",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'local',
      unique: 'uniqueUserProvider',
      comment: "登录提供方"
    },
    providerUid: {
      field: "provider_uid",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: 'uniqueUserProvider',
      comment: "登录提供方用户id"
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
      allowNull: true,
      defaultValue: null,
      unique: false,
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
    avatar: {
      field: "avatar",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "http://oss.huoshui.org/default_avatar.jpg",
      unique: false,
      comment: "头像"
    },
    gender: {
      field: "gender",
      type: Sequelize.ENUM('男', '女'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "性别"
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
      foreignKey: 'author_id'
    }); // 1:n
    User.hasMany(Feedback, {
      as: 'Feedbacks',
      foreignKey: 'user_id'
    }); // 1:n
    User.hasMany(Kelist, {
      as: 'OwnsKelists',
      foreignKey: 'author_id'
    }); // 1:n
    User.belongsToMany(Kelist, {
      as: 'CollectedKelists',
      through: 'Join_Kelist_Collectors_User',
      foreignKey: 'user_id'
    }); // m:n
    User.belongsToMany(Review, {
      as: 'LikedReviews',
      through: 'Join_User_LikedReviews_Review',
      foreignKey: 'user_id'
    }); // m:n
    User.belongsToMany(Review, {
      as: 'DislikedReviews',
      through: 'Join_User_DislikedReviews_Review',
      foreignKey: 'user_id'
    }); // m:n
  },
  options: {
    tableName: 'user',
    underscored: true,
    freezeTableName: true,
    classMethods: {},
    instanceMethods: {
      toJSON: function () {
        var values = Object.assign({}, this.get());
        delete values.password;
        delete values.salt;
        return values;
      }
    },
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
