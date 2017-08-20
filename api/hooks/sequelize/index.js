module.exports = function(sails) {
  var path_config = sails.config.appPath + "/config/env/"
  var path_config_dev = path_config + "development.js";
  var path_config_pro = path_config + "production.js";

  global['Sequelize'] = require('sequelize');
  Sequelize.cls = require('continuation-local-storage').createNamespace('sails-sequelize-postgresql');
  var config_dev = require(path_config_dev);
  var config_pro = require(path_config_pro);


  return {
    initialize: function(next) {
      var hook = this;
      hook.initAdapters();
      hook.initModels();

      //setup connection
      var connectName = sails.config.models.connection;
      var connection = sails.config.connections[connectName];
      if (connection) {
        sails.log.debug('Using connection named ' + connectName);
      } else {
        throw new Error('Connection \'' + sails.config.models.connection + '\' not found in config');
      }

      if (connection.options == null) {
        connection.options = {};
      }
      connection.options.logging = connection.options.logging
                                || sails.log.verbose; //executed everytime Sequelize would log something.

      //setup migration
      var migrate = sails.config.models.migrate;
      sails.log.debug('Migration: ' + migrate);

      //sequalize initalization
      var sequelize;
      if (connection.url) {
        sequelize = new Sequelize(connection.url, connection.options);
      } else {
        sequelize = new Sequelize(connection.database, connection.user, connection.password, connection.options);
      }

      sequelize
        .authenticate()
        .then(function(err) {
          sails.log.debug('Database connection has been established successfully!');
        })
        .catch(function (err) {
          sails.log.error('Unable to connect to the database:', err);
        });

      //setup models and associations
      global['sequelize'] = sequelize;
      return sails.modules.loadModels(function(err, models) {
        var modelDef, modelName, ref;
        if (err != null) {
          return next(err);
        }
        for (modelName in models) {
          modelDef = models[modelName];
          sails.log.verbose('Loading model \'' + modelDef.globalId + '\'');
          global[modelDef.globalId] = sequelize.define(modelDef.globalId, modelDef.attributes, modelDef.options);
          sails.models[modelDef.globalId.toLowerCase()] = global[modelDef.globalId];
        }

        for (modelName in models) {
          modelDef = models[modelName];

          hook.setAssociation(modelDef);
          hook.setDefaultScope(modelDef);
        }

        var forceSync = migrate === 'drop'
        sequelize.sync({
          force: forceSync
        }).then((result) => {
          return next()
        }).catch(() => {
          sails.log.debug("Database sync error!")
          return next()
        })
      })
    },

    initAdapters: function() {
      if(sails.adapters === undefined) {
        sails.adapters = {};
      }
    },

    initModels: function() {
      if(sails.models === undefined) {
        sails.models = {};
      }
    },

    setAssociation: function(modelDef) {
      if (modelDef.associations != null) {
        sails.log.verbose('Loading associations for \'' + modelDef.globalId + '\'');
        if (typeof modelDef.associations === 'function') {
          modelDef.associations(modelDef);
        }
      }
    },

    setDefaultScope: function(modelDef) {
      if (modelDef.defaultScope != null) {
        sails.log.verbose('Loading default scope for \'' + modelDef.globalId + '\'');
        var model = global[modelDef.globalId];
        if (typeof modelDef.defaultScope === 'function') {
          var defaultScope = modelDef.defaultScope() || {};
          model.addScope('defaultScope',defaultScope,{override: true});
        }
      }
    }
  };
};
