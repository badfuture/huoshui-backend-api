

module.exports.connections = {

  localPostgresqlServer: {
    user: 'postgres',
    password: 'postgres',
    database: 'test',
    dialect: 'postgres',
    options: {
      dialect: 'postgres',
      host   : 'localhost',
      port   : 5432,
      logging: console.log
    }
  }
};
