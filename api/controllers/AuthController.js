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
		sails.log.verbose("signup user: " + req.param('email'))
		var existEmail = false
		var existUsername = false

		User.findOne({
			where: {email: req.param('email')}
		}).then(function(user){
			if (user) {existEmail = true}
			return User.findOne({
				where: {username: req.param('username')}
			})
		}).then((user) => {
			if (user) { existUsername = true}
			if (existUsername) {
				res.badRequest("user username already exists!")
			} else if (existEmail) {
				res.badRequest("user email already exists!")
			} else {
				let allUserInfo = null
				let userCreated = null
				User.create(_.omit(req.allParams(), 'id'))
				.then((user) => {
					userCreated = user
					let userData = user.dataValues
					delete userData.password
					delete userData.salt
					allUserInfo = {
						token: CipherService.createToken(user),
						user: userData
					}
					return KelistService.createDefaultKelist()
				}).then((defaultKelist) => {
					return userCreated.addOwnsKelists(defaultKelist)
				}).then(() => {
					return res.created(allUserInfo)
				})

			}
		}).catch(res.serverError)
	},

};
