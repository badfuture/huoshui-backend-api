const passport = require('passport')

const _onPassportAuth = (req, res, error, user, info) => {
	if (error) return res.serverError(error);
	if (!user) return res.unauthenticated(null, info && info.code, info && info.message);

	User.findOne({
		where: { id: user.id},
		include: IncludeService.UserInclude('all')
	})
	.then((userFullInfo) => {
		return res.ok({
			token: CipherService.createJwtToken(user),
			user: userFullInfo
		})
	})
}

module.exports = {
  localAuth: (req, res) => {
    passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res)
  },

	jwtAuth: (req, res, next) => {
	  passport.authenticate('jwt', function(error, user, info) {
	    if (error) return res.serverError(error)
	    if (!user) return res.unauthenticated(null, info && info.code, info && info.message)

	    req.user = user // inject user into req, to be used further down in the pipeline

			Token.findOne({
				where: {
					jwtId: CipherService.getJwtId(req),
					revoked: true,
				}
			}).then((token) => {
				if (token) {
					return res.unauthenticated(null, null, "token already revoked")
				} else {
					next()
				}
			})
	  })(req, res, next)
	},
}
