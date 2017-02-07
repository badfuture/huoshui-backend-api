var pluralize = require('pluralize');

var swaggerData = {
    "swagger": "2.0",
    "info": {
        "title": "Huoshui Backend API",
        "version": "1.0.0",
        "description": "Huoshui API described in OpenAPI-2.0 specification"
    },
    "host": "api.huoshui.org",
    "schemes": [
      "http"
    ],
    "basePath": "",
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],
    "paths": {},
    "definitions": {}
};

var defaultResp = function() {
  var resp = {
    "200": {
      "description": "success: return a single object"
    },
    "404": {
      "description": "data not found"
    }
  }
  return defaultResp;
};

var actionToWord = function(action) {
  var word = "";
  switch (action) {
    case "get":
      word = "find";
      break;
    case "post":
      word = "create";
      break;
    case "put":
      word = "update";
      break;
    case "delete":
      word = "remove";
      break;
    default:
      word = action;
  }
  return word;
};

var sailsToSwagTypeMap = function(sailsType) {
  sailsType = sailsType.toLowerCase();
  var mapping = {
    integer: {
      type: 'integer',
      format: 'int32'
    },
    float: {
      type: 'number',
      format: 'float'
    },
    double: {
      type: 'number',
      format: 'double'
    },
    string: {
      type: 'string',
      format: 'string'
    },
    binary: {
      type: 'string',
      format: 'binary'
    },
    boolean: {
      type: 'boolean'
    },
    date: {
      type: 'string',
      format: 'date'
    }
  };
  return mapping[sailsType];
};

var sailsToSwagAction = function(sailsPath){
  var sailsAction = (sailsPath.match(/(^[a-zA-z]+)/)[1]).toLowerCase();
  return sailsAction;
};

var sailsToSwagPath =  function(sailsPath) {
  var swaggerPath = sailsPath.substr(sailsPath.indexOf('/'), sailsPath.length);
  swaggerPath = swaggerPath.replace(/:(\w+)/, '{$1}');
  return swaggerPath;
};

var sailsToSwagParams = function(sailsModel, isPlural) {
  var attributes = sailsModel.attributes;
  var swagParams = [];
  Object.keys(attributes).forEach(function(field){

    var attr = attributes[field];
    var sailsType = attr.type.key;
    var required = false;
    var location = "query";
    var swagType = sailsToSwagTypeMap(sailsType);
    if (!swagType) {
      return;
    }

    if (!isPlural) {
      if (attr.field === "id") {
        required = true;
        location = "path";
      }
    }

    var param = {
      name: attr.field,
      in: location,
      description: attr.field + " of data",
      required: required,
      type: swagType.type,
      format: swagType.format
    };
    swagParams.push(param);
  });
  return swagParams;
};

module.exports = {

  generateDocJson: function(req, res) {
    var routes = JSON.parse(JSON.stringify(sails.config.routes));
    var parseRoutes = function() {
      Object.keys(routes).forEach(function (path) {

        // get route info
        var swagPath = sailsToSwagPath(path);
        var route = routes[path];
        var swagCustom = route.swagger;
        var isPlural = route.isPlural;
        var swagAuto = {};

        var modelName = route.model;
        var model = sails.models[modelName];

        // skip if swagger not defined in route
        if (!(route && swagCustom && model)) {
          return;
        } else {
          //parse model to generate swagger json
          var action = sailsToSwagAction(path);
          var word = actionToWord(action);
          var summary = "";
          var description = "";
          if (isPlural) {
            summary = word + " " + pluralize(modelName);
            description = word + " " + pluralize(modelName);
          } else {
            summary = word + " a " + modelName;
            description = word + " a " + modelName;
          }

          swagAuto.summary = swagCustom.summary ? swagCustom.summary : summary;
          swagAuto.description = swagCustom.description ? swagCustom.description : description;
          swagAuto.produces = swagCustom.produces ? swagCustom.produces : ['application/json'];
          swagAuto.tags = swagCustom.tags ? swagCustom.tags : (modelName ? [modelName] : ["other"]);
          swagAuto.parameters = swagCustom.parameters ? swagCustom.parameters : sailsToSwagParams(model, isPlural);
          swagAuto.responses = swagCustom.responses ? swagCustom.responses : defaultResp();

          swaggerData.paths[swagPath] = {};
          swaggerData.paths[swagPath][action] = swagAuto;
        }
      });
      res.ok(swaggerData);
    };
    process.nextTick(parseRoutes);
  }
};
