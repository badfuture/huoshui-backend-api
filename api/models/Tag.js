"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "tag name",
    },
    isPositive: {
      field: "isPositive",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "is the tag has a positive meaning",
    },
    category: {
      field: "category",
      type: Sequelize.ENUM('course', 'prof'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "category of the info the tag applies to",
    },
  },
  associations: function() {
    Tag.belongsToMany(Course, {
      as: 'Courses',
      through:{
        model: 'JoinItemTag',
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false,
    }); // m:n
    Tag.belongsToMany(Review, {
      as: 'Reviews',
      through: {
        model: 'JoinItemTag',
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false,
    }); // m:n
    Tag.belongsToMany(Prof, {
      as: 'Profs',
      through: {
        model: 'JoinItemTag',
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false,
    }); // m:n
  },
  options: {
    tableName: 'tag',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
