"use strict";
const url = require('url')
const domain = require('../constants/domain')
const defaultAvatar = 'default_avatar.jpg'

module.exports = {
  attributes: {
    username: {
      field: "username",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
      comment: "用户名"
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
      defaultValue: defaultAvatar,
      unique: false,
      comment: "头像",
      get() {
        return url.resolve(domain.OBJECT_STORAGE, this.getDataValue('avatar'))
      }
    },
    avatarSmall: {
      type: Sequelize.VIRTUAL,
      comment: "小头像",
      get() {
        return url.resolve(domain.OBJECT_STORAGE, this.getDataValue('avatar')) + '?imageView2/1/w/50/h/50'
      }
    },
    avatarLarge: {
      type: Sequelize.VIRTUAL,
      comment: "大头像",
      get() {
        return url.resolve(domain.OBJECT_STORAGE, this.getDataValue('avatar')) + '?imageView2/1/w/180/h/180'
      }
    },
    gender: {
      field: "gender",
      type: Sequelize.ENUM('男', '女'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "性别"
    },
    isInitialized: {
      field: "isInitialized",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      unique: false,
      comment: "是否已经初始化（本地登录默认为true，仅社交登录需要初始化）"
    },
  },
  associations: function() {
    User.hasOne(UserLocal, {
      as: "UserLocal",
      foreignKey: 'user_id'
    }); // courseStat: 1:1
    User.hasOne(UserQQ, {
      as: "UserQQ",
      foreignKey: 'user_id'
    }); // courseStat: 1:1
    User.hasOne(UserWeibo, {
      as: "UserWeibo",
      foreignKey: 'user_id'
    }); // courseStat: 1:1
    User.belongsTo(School, {
      as: 'School',
      foreignKey: 'school_id'
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
    User.belongsToMany(Role, {
      as: 'Roles',
      through: 'Join_User_Roles_Role',
      foreignKey: 'user_id'
    }); // n:1
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
    User.belongsToMany(Course, {
      as: 'LikedCourses',
      through: 'Join_User_LikedCourses_Course',
      foreignKey: 'user_id'
    }); // m:n
    User.belongsToMany(Prof, {
      as: 'LikedProfs',
      through: 'Join_User_LikedProfs_Prof',
      foreignKey: 'user_id'
    }); // m:n
  },
  options: {
    tableName: 'user',
    underscored: true,
    freezeTableName: true,
    classMethods: {},
    instanceMethods: {},
    hooks: {
      beforeCreate: (user, options) => {
        const MAX = 5
        const MIN = 1
        const img_num = Math.floor(Math.random() * (MAX - MIN)) + MIN
        const img = `site/images/default_avatar/${img_num}.png`
        user.avatar = img
      },
    }
  }
};
