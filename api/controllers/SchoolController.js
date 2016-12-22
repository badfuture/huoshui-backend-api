/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 */

module.exports = {
	create: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var data = ActionUtil.parseValues(req);

    Model.create(data).then(function(newInstance) {
       res.created(newInstance);
    }).catch(function(err){
       return res.serverError(err);
    });
  },
};
