/*****************************************
* Reference document for SailsJs commands
******************************************/


/**********************************
commands
***********************************/
sails new project_name
sails lift
sails generate api user
sails generate controller user
npm install package_name --save

//set to production model
export NODE_ENV=production

/*****************************************
SailsJs Concepts
******************************************/
routing
  custom routes
    match explict route
    then trigger controller/action
  shadow routes
    blueprint routes: auto generated as long as model and controller with same name exist
    shortcut routes: rest-like routes access from browsers
    cross-site request forgery (CSRF) token route
  asset routes
    map directly to file system

policy
  executed before controller action is executed
  access control system
    user identity management (create account)
    front-end personalization (choose what the user sees)
    authentication ()
    backend-end api access

controller: aggregates actions under a common resource

model: representing a table
  attributes: table columns
  methods: building function for manipulating records (find, create, update, destroy)
  settings: configurable properties (connection, tableName, migrate, schema)
  adapter:

localjs: override existing configuration

/***********************************
operation flow
***********************************/
incoming request
matches explicit route
router
  triggers a controller/action
  triggers a server rendered view
gathers incoming params
using the params to manipulate data
returns a response code depends on the status

/*****************************************
Sequelize commands
******************************************/
Project.hasOne(User, {
  as: 'Initiator',
  foreignKey: 'initiator_id',
})
Project.hasMany(User, {
  as: 'users',
  foreignKey: 'project_id',
})
User.belongsTo(Company, {
  as: 'company'
  foreignKey: 'company_id'
});
project.belongsToMany(user, {
  as: 'users',
  through: 'user_of_project',
  foreignkey: 'project_id'
});
