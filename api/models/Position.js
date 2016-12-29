"use strict";

module.exports = {
  attributes: {
    name: {
      field: "name",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
      unique: true,
      comment: "Position name",
    },

  },
  associations: function() {
    Position.hasMany(Prof, {
      as: 'Profs',
      foreignKey: 'position_id',
    }); // 1:n
  },
  options: {
    tableName: 'position',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
