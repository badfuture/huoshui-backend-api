

var swaggerData = {
    "swagger": "2.0",
    "info": {
        "title": "Huoshui Backend API",
        "version": "1.0.0",
        "description": "Huoshui API described in OpenAPI-2.0 specification"
    },
    "host": "api.huoshui.org",
    "schemes": [
      "https"
    ],
    "basePath": "/v1",
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],
    "paths": {},
    "definitions": {}
};


module.exports = {

  generateDocJson: function(sails, res) {
    var sailsRoutes = JSON.parse(JSON.stringify(sails.sails.router.explicitRoutes));

    process.nextTick(function() {
        Object.keys(sailsRoutes).forEach(function (path) {
            var sanityPath = path.substr(path.indexOf('/'), path.length);

            sanityPath = sanityPath.replace(/:(\w+)/, '{$1}');

            if (sailsRoutes[path] && sailsRoutes[path].swagger) {
                var swag = sailsRoutes[path].swagger;
                swag.methods.forEach(function (doc) {
                    if (!swaggerData.paths[sanityPath]) {
                        swaggerData.paths[sanityPath] = {};
                    }

                    swaggerData.paths[sanityPath][doc] = swag;
                });
                delete swag.methods;
            }
            else {
                console.log('ignoring ', path, 'has no swagger doc');
            }
        });
        res.ok(swaggerData);
    });
  }
};
