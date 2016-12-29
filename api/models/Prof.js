"use strict";

module.exports = {
  attributes: {
    //personal info
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: false,
      comment: "prof name",
    },
    code: {
      field: "code",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof code number, specific to school",
    },
    gender: {
      field: "gender",
      type: Sequelize.ENUM('male', 'female'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof code number, specific to school",
    },
    birth: {
      field: "birth",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 1930, max: 2010},
      comment: "prof year of birth",
    },
    hometown: {
      field: "hometown",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof hometown",
    },
    motto: {
      field: "motto",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof motto",
    },

    //contact info
    email: {
      field: "email",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof email",
    },
    phone: {
      field: "phone",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof phone",
    },
    homepage: {
      field: "homepage",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof homepage",
    },

    //professional background
    exp: {
      field: "exp",
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      unique: false,
      validate: {min: 0, max: 100},
      comment: "prof research group",
    },
    researchGroup: {
      field: "researchGroup",
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof research group",
    },

    intro: {
      field: "intro",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof personal introduction",
    },
    education: {
      field: "education",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof education",
    },
    research: {
      field: "research",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof research",
    },
    achievement: {
      field: "achievement",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof achievement",
    },
    pastCourses: {
      field: "pastCourses",
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "prof past Courses",
    }
  },
  associations: function() {
    Prof.belongsTo(School, {
      as: 'School',
      foreignKey: 'school_id',
    }); // n:1
    Prof.belongsTo(Position, {
      as: 'Position',
      foreignKey: 'position_id',
    }); // n:1
    Prof.hasMany(Course, {
      as: 'Courses',
      foreignKey: 'prof_id',
    }); // 1:n
    Prof.belongsToMany(Dept, {
      as: 'Depts',
      through: 'prof_dept',
      foreignKey: 'prof_id',
    }); // m:n
  },
  options: {
    tableName: 'prof',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
