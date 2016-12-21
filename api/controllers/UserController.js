/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  find: function(req,res){
    User.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      //populate
    }).then(function(users){
      return res.ok(users);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){

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
