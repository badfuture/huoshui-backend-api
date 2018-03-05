var sails = require("sails");

//change the params below to match your local server setting
module.exports.connections = {
  devPsqlServer: {
    user: 'admin',
    password: 'huoshui',
    database: 'huoshui_api',
    options: {
      //db options
      dialect: 'postgres',
      host   : 'localhost',
      port   : 5432,
      logging: sails.log.verbose,
      pool: {
        max: 20,
        min: 0,
        idle: 20000,
        acquire: 40000,
        evict: 20000,
      },
      
      //model options
      timestamps: true, //enable timestamps for all tables
      underscored: true, // use underscored naming style
      paranoid: false, // perform actual delete
      freezeTableName: true, // stop sequelize from transforming tableName
    }
  },
  prodPsqlServer: {
    user: 'admin',
    password: 'huoshui',
    database: 'huoshui_api',
    options: {
      //db options
      dialect: 'postgres',
      host   : 'psql',
      port   : 5432,
      logging: sails.log.verbose,
      pool: {
        max: 20,
        min: 0,
        idle: 20000,
        acquire: 40000,
        evict: 20000,
      },

      //model options
      timestamps: true, //enable timestamps for all tables
      underscored: true, // use underscored naming style
      paranoid: false, // perform actual delete
      freezeTableName: true, // stop sequelize from transforming tableName
    },
  }
};
