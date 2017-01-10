/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 */

module.exports = {

  find: function(req,res){
    var customInclude = ActionUtil.populateEach(req);
    var defaultInclude = [
      { model: Dept, as: 'Dept'},
      { model: School, as: 'School'}
    ];
    var includeOption = (customInclude.length === 0)
                  ? defaultInclude : customInclude;

    User.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: includeOption
    }).then(function(recordsFound){
      return res.ok(recordsFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    var pk = ActionUtil.requirePk(req);
    var customInclude = ActionUtil.populateEach(req);
    var defaultInclude = [
      { model: Dept, as: 'Dept'},
      { model: School, as: 'School'}
    ];
    var includeOption = (customInclude.length === 0)
                  ? defaultInclude : customInclude;

    User.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  create: function(req,res){
    //handled in AuthController.signup
  },

  update: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var pk = ActionUtil.requirePk(req);
    var values = ActionUtil.parseValues(req);

    // Omit the path parameter `id` from values, unless it was explicitly defined
    // elsewhere (body/query):
    var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
    if (!idParamExplicitlyIncluded) delete values.id;

    if (typeof values[Model.primaryKey] !== 'undefined') {
      req._sails.log.warn('Cannot change primary key via update blueprint; ignoring value sent for `' + Model.primaryKey + '`');
    }
    delete values[Model.primaryKey];

    Model.findById(pk).then(function(matchingRecord) {

      if (!matchingRecord) return res.notFound();

      Model.update(values, { where: { id: pk }}).then(function(records) {
        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(util.format('Unexpected output from `%s.update`.', Model.globalId));
        }

        var updatedRecord = pk;

        var Q = Model.findById(updatedRecord, {include: req._sails.config.blueprints.populate ? [{ all: true }] : []})
        .then(function(populatedRecord) {
          if (!populatedRecord) return res.serverError('Could not find record after updating!');
          res.ok(populatedRecord);
        }).catch(function(err){
          return res.serverError(err);
        });
      }).catch(function(err){
        return res.negotiate(err);
      });
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  destroy: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var pk = ActionUtil.requirePk(req);

    Model.findById(pk, { include: req._sails.config.blueprints.populate ? [{ all: true }] : []})
    .then(function(record) {
      if(!record) return res.notFound('No record found with the specified `id`.');
      Model.destroy({ where: { id: pk }}).then(function() {
        return res.ok(record);
      }).catch(function(err){
        return res.negotiate(err);
      });
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  populate: function(req,res){

  },

  add: function(req,res){

  },

  remove: function(req,res){

  }
};
