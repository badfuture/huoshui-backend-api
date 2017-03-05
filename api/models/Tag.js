"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "标签名"
    },
    isPositive: {
      field: "isPositive",
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "标签是否正面"
    },
    category: {
      field: "category",
      type: Sequelize.ENUM('course', 'prof', 'kelist'),
      allowNull: true,
      defaultValue: null,
      unique: false,
      comment: "标签的类型"
    },
  },
  associations: function() {
    Tag.belongsToMany(Course, {
      as: 'Courses',
      through:{
        model: 'Join_Item_Tag',
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false
    }); // m:n
    Tag.belongsToMany(Review, {
      as: 'Reviews',
      through: {
        model: 'Join_Item_Tag',
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false
    }); // m:n
    Tag.belongsToMany(Prof, {
      as: 'Profs',
      through: {
        model: 'Join_Item_Tag',
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false
    }); // m:n
    Tag.belongsToMany(Kelist, {
      as: 'Kelists',
      through: {
        model: 'Join_Item_Tag',
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false
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
