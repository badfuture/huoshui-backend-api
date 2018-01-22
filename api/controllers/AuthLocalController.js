/**
 * AuthLocalController
 * @description :: Server-side logic for manage user's authorization
 */


module.exports = {
	login: function(req, res) {
		LocalAuthService.login(req, res)
	},

	signup: function(req, res) {
		const EmailTaken = new ErrorModel.err(ErrorCode.EmailTaken)
		const UsernameTaken = new ErrorModel.err(ErrorCode.UsernameTaken)
		LocalAuthService.signup(req, res)
		.catch({code: EmailTaken.code}, (e) => {
			return res.badRequest(EmailTaken.toJson)
		})
		.catch({code: UsernameTaken.code}, (e) => {
			return res.badRequest(UsernameTaken.toJson)
		})
		.catch((e) => {
     	return res.serverError(e)
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
