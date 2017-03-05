"use strict";

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_id: {
      type: Sequelize.INTEGER,
      unique: 'item_tag_taggable'
    },
    taggable: {
      field: "taggable",
      type: Sequelize.ENUM('course', 'review', 'prof', 'kelist'),
      allowNull: false,
      defaultValue: null,
      unique: 'item_tag_taggable',
      comment: "被贴标签对象的类型"
    },
    taggable_id: {
      type: Sequelize.INTEGER,
      unique: 'item_tag_taggable',
      references: null
    },
    count: {
      field: "count",
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: false,
      comment: "counter of how many time tags were applied",
    },
  },
  associations: function() {
  },
  options: {
    tableName: 'Join_Item_Tag',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
