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
      type: Sequelize.STRING,
      unique: 'item_tag_taggable'
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
    instanceMethods: {
      //getItem: function() {
      //  return this['get' + this.get('commentable').substr(0, 1).toUpperCase() + this.get('commentable').substr(1)]();
      //}
    },
    hooks: {}
  }
};
