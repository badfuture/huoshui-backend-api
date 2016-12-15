/**
 * Development environment settings
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

   models: {
     connection: 'localPostgresqlServer',
     schema: true,
     autoPK: true,
     autoCreatedAt: true,
     autoUpdatedAt: true,
     migrate: 'drop'
   },

};
