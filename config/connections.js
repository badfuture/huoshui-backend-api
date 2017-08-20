var sails = require("sails");

//change the params below to match your local server setting
module.exports.connections = {
  localPostgresqlServer: {
    user: 'admin',
    password: 'huoshui',
    database: 'huoshui_api',
    options: {
      //db options
      dialect: 'postgres',
      host   : 'psql',
      port   : 5432,
      logging: sails.log.verbose,

      //model options
      timestamps: true, //enable timestamps for all tables
      underscored: true, // use underscored naming style
      paranoid: false, // perform actual delete
      freezeTableName: true, // stop sequelize from transforming tableName

    }
  }
};
