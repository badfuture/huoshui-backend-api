"use strict";
const domain = require('../constants/domain')

module.exports = {
  attributes: {
    shortname: {
      field: "shortname",
      type: Sequelize.STRING,
      type_swag: "string",
      allowNull: false,
      defaultValue: null,
      unique: true,
      validate: {
        isUnique: function(value, next) {
          Dept.find({
            where: {shortname: value},
            attributes: ['id']
          }).then((dept) => {
            if (dept) return next('Dept shortname already in use!');
            next();
          })
        }
      },
      comment: "院系简称"
    },
    longname: {
      field: "longname",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      validate: {
        isUnique: function(value, next) {
          Dept.find({
            where: {longname: value},
            attributes: ['id']
          }).then((dept) => {
            if (dept) return next('Dept longname already in use!');
            next();
          })
        }
      },
      comment: "院系全称"
    },
    alias: {
      field: "alias",
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: null,
      unique: true,
      validate: {
        isUnique: function(value, next) {
          Dept.find({
            where: {alias: {
              $contains: value
            }},
            attributes: ['id']
          }).then((dept) => {
            if (dept) return next('Dept alias already in use!');
            next();
          })
        }
      },
      comment: "院系别名"
    },
    image: {
      field: "image",
      type: Sequelize.STRING,
      type_swag: "string",
      allowNull: false,
      defaultValue: null,
      comment: "院系图片",
      get() {
        return domain.OBJECT_STORAGE + '/site' +  this.getDataValue('image')
      }
    },
    icon: {
      field: "icon",
      type: Sequelize.STRING,
      type_swag: "string",
      allowNull: false,
      defaultValue: null,
      comment: "院系icon",
      get() {
        return domain.OBJECT_STORAGE + '/site' + this.getDataValue('icon')
      }
    }
  },
  associations: function() {
    Dept.belongsTo(School, {
      as: 'School',
      foreignKey: 'school_id'
    }); // n:1
    Dept.hasMany(User, {
      as: 'Users',
      foreignKey: 'dept_id'
    }); // 1:n
    Dept.belongsToMany(Course, {
      as: 'Courses',
      through: 'JoinCourseDept',
      foreignKey: 'dept_id'
    }); // m:n
    Dept.belongsToMany(Prof, {
      as: 'Profs',
      through: 'prof_dept',
      foreignKey: 'dept_id'
    }); // m:n

  },
  options: {
    tableName: 'dept',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
