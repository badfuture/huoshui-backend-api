/**
 * Production environment settings
 *
 */

module.exports = {

  models: {
    connection: 'localPostgresqlServer',
    schema: true,
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    migrate: 'safe'
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
