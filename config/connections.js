
//change the params below to match your local server setting
module.exports.connections = {
  localPostgresqlServer: {
    user: 'postgres',
    password: 'postgres',
    database: 'test',
    options: {
      dialect: 'postgres',
      host   : 'localhost',
      port   : 5432,
      logging: console.log
    }
  }
};
