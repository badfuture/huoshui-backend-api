/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
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

  },

  update: function(req,res){

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
