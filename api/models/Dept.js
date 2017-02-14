"use strict";

module.exports = {
  attributes: {
    shortname: {
      field: "shortname",
      type: Sequelize.STRING,
      type_swag: "string",
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "院系简称"
    },
    longname: {
      field: "longname",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "院系全称"
    },
    alias: {
      field: "alias",
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "院系别名"
    },
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
