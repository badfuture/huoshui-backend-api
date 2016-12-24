module.exports.blueprints = {

  // Enable blueprint-sequelize
  enable: true,

  // Blueprint/Shadow-Routes Enabled
  //
  // e.g. '/frog/jump': 'FrogController.jump'
  actions: false,

  // e.g. '/frog': 'FrogController.index'
  index: false,

  // e.g. '/frog/find/:id?': 'FrogController.find'
  shortcuts: false,

  // e.g. 'get /frog/:id?': 'FrogController.find'
  rest: true,

  // Blueprint/Shadow-Route Modifiers
  //
  // e.g. 'get /api/v2/frog/:id?': 'FrogController.find'
  prefix: '',

  // Blueprint/REST-Route Modifiers
  // Will work only for REST and will extend `prefix` option
  //
  // e.g. 'get /api/v2/frog/:id?': 'FrogController.find'
  restPrefix: '',

  // e.g. 'get /frogs': 'FrogController.find'
  pluralize: true,

  // Configuration of the blueprint actions themselves:
  //
  // Whether to populate all association attributes in the `find`
  // blueprint action.
  populate: true,

  defaultLimit: 30,
  populateLimit: 30,
  autoWatch: true,
}
