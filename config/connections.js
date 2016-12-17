
//change the params below to match your local server setting
module.exports.connections = {
  localPostgresqlServer: {
    user: 'postgres',
    password: 'postgres',
    database: 'test',
    options: {
      //db options
      dialect: 'postgres',
      host   : 'localhost',
      port   : 5432,
      logging: console.log,

      //model options
      timestamps: true, //enable timestamps for all tables
      underscored: true, // use underscored naming style
      paranoid: false, // perform actual delete
      freezeTableName: true, // stop sequelize from transforming tableName

    }
  }
};
