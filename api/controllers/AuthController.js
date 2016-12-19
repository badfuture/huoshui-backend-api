/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');

function _onPassportAuth(req, res, error, user, info) {
	if (error) return res.serverError(error);
	if (!user) return res.unauthorized(null, info && info.code, info && info.message);

	return res.ok({
		token: CipherService.createToken(user),
		user: user
	});
}

module.exports = {
	login: function(req, res) {
		passport.authenticate('local',
			_onPassportAuth.bind(this, req, res))(req, res);
	},

	signup: function(req, res) {
		sails.log.verbose("signup user: " + req.param('email'));
		var existEmail = false;
		var existUsername = false;

		User.findOne({
			where: {email: req.param('email')}
		}).then(function(user){
			if (user) {existEmail = true;}
			return User.findOne({
				where: {username: req.param('username')}
			})
		}).then(function(user){
			if (user) { existUsername = true;}
			if (existUsername) {
				res.badRequest("user username already exists!");
			} else if (existEmail) {
				res.badRequest("user email already exists!");
			} else {
				User.create(_.omit(req.allParams(), 'id'))
				.then(function(user) {
					var userData = user.dataValues;
					delete userData.password;
					delete userData.salt;
					return {
						token: CipherService.createToken(user),
						user: userData
					};
				})
				.then(function(user){
					res.created(user);
				});
			}
		}).catch(res.serverError);
	},

};
