/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */

module.exports = {
	login: function(req, res) {
		AuthService.localAuth(req, res)
	},

	signup: function(req, res) {
		sails.log.verbose("signup user: " + req.param('email'))
		let existEmail = false
		let existUsername = false

		let userCreated = null
		let jwtToken = null

		User.findOne({
			where: {email: req.param('email')}
		}).then((user) => {
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
				User.create(_.omit(req.allParams(), 'id'))
				.then((user) => {
					userCreated = user
					jwtToken = CipherService.createJwtToken(user)
					return KelistService.createDefaultKelist()
				}).then((defaultKelist) => {
					return userCreated.addOwnsKelists(defaultKelist)
				}).then(() => {
					return User.findOne({
						where: { id: userCreated.id },
						include: IncludeService.UserInclude('all')
					})
				}).then((userFullInfo) => {
					return res.ok({
						token: jwtToken,
						user: userFullInfo
					})
				})
			}
		})
    .catch((err)=> {
      res.serverError(err)
		})
	},

	blacklistToken: (req, res) => {
		const jwtId = req.param('jti')
		Token.findOne({
			where: { jwtId }
		}).then((token) => {
			if (token && token.revoked) {
				res.ok("token was already revoked")
			} else if (token && !token.revoked) {
				token.revoked = true
				token.save()
				res.ok("token revoked")
			} else {
				res.badRequest("token not found")
			}
		})
	}

};
