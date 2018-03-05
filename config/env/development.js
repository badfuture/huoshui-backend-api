/**
 * Development environment settings
 *
 */

module.exports = {

   models: {
     connection: 'devPsqlServer',
     schema: true,
     autoPK: true,
     autoCreatedAt: true,
     autoUpdatedAt: true,
     migrate: 'safe'
   },

   objectStorage: {
     bucket: 'huoshui-oss',
     accessKey: 'CTtEN_6ga3gjXiTBBLwHTVWVjqKIWI63xMDz9_KC',
     secretKey: 'tlcCOtw3KJq8yVxYVLQBG2ZLmOOvNmU6k7tYRSEX',
     domain: 'http://cdn.huoshui.org'
   }
};
