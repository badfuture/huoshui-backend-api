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

   objectStorage: {
     bucket: 'huoshui-oss',
     accessKey: 'CTtEN_6ga3gjXiTBBLwHTVWVjqKIWI63xMDz9_KC',
     secretKey: 'tlcCOtw3KJq8yVxYVLQBG2ZLmOOvNmU6k7tYRSEX',
     domain: 'http://oss.huoshui.org'
   }
};
