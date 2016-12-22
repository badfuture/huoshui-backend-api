/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 */

module.exports = {

  find: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var populate = ActionUtil.populateEach(req);

    Model.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: req._sails.config.query.populate ?
                (_.isEmpty(populate) ? [{ all : true}] : populate) : []
      //populate
    }).then(function(users){
      return res.ok(users);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var populate = ActionUtil.populateEach(req);
    var pk = ActionUtil.requirePk(req);

    Model.findById(pk, {
      include: req._sails.config.query.populate ?
                          (_.isEmpty(populate) ? [{ all : true}] : populate) : []
    }).then(function(matchingRecord) {
      if(!matchingRecord) return res.notFound('No record found with the specified `id`.');
      res.ok(matchingRecord);
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

        var Q = Model.findById(updatedRecord, {include: req._sails.config.query.populate ? [{ all: true }] : []})
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

  },

  populate: function(req,res){

  },

  add: function(req,res){

  },

  remove: function(req,res){

  }
};
