const Utils = require('../utils/SwaggerUtils.js')

let swaggerSpec = {
  "swagger": "2.0",
  "info": {
    "title": "Huoshui API",
    "version": "1.0",
    "description": "Huoshui API in OpenAPI 2.0 specification"
  },
  "host": "api.huoshui.org",
  "schemes": [
    "https"
  ],
  "basePath": "/",
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {},
  "definitions": {}
}


const parseSailsRoutes = (sailsRoute) => {
  const routes = JSON.parse(JSON.stringify(sailsRoute))
  Object.keys(routes).forEach((path) => {

    // get sails route
    let route = routes[path]

    // get sails model
    var modelName = route.model
    var model = sails.models[modelName]

    // get swag path
    let swagPath = Utils.sailsToSwagPath(path)

    // get swag config
    let swaggerRoute = route.swagger
    let swagEnabled = swaggerRoute ? swaggerRoute.enabled : false
    let swagConfig = swaggerRoute ? swaggerRoute.config : null
    let swagParamList = swagConfig ? swagConfig.paramList : null

    // init swag action detail
    let swagActionDetail = {}

    // skip if swagger not defined in route
    if (!route || !swaggerRoute || !swagConfig || !swagEnabled) {
      return false
    } else {
      //parse model to generate swagger json
      let swagAction = Utils.sailsToSwagAction(path)

      swagActionDetail.summary = swagConfig.summary ? swagConfig.summary : ''
      swagActionDetail.description = swagConfig.description ? swagConfig.description : ''
      swagActionDetail.produces = swagConfig.produces ? swagConfig.produces : ['application/json']
      swagActionDetail.tags = swagConfig.tags ? swagConfig.tags : (modelName ? [modelName] : ["other"])
      swagActionDetail.parameters = swagConfig.parameters ? swagConfig.parameters : Utils.actionListToSwagParams(swagParamList)
      swagActionDetail.responses = Utils.sailsToSwagResponses(swagConfig.responses)

      swaggerSpec.paths[swagPath] = {}
      swaggerSpec.paths[swagPath][swagAction] = swagActionDetail
      swaggerSpec.definitions[modelName] = Utils.sailsToSwagDefinitions(model)
    }
  })
}

module.exports = {

  generateDocJson: (req, res) => {
    parseSailsRoutes(sails.config.routes)
    res.ok(swaggerSpec)
  }
}
