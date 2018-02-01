/**
 * AuthLocalController
 * @description :: Server-side logic for manage user's authorization
 */


module.exports = {
	login: function(req, res) {
		AuthLocalService.login(req, res)
	},

	signup: function(req, res) {
		AuthLocalService.signup(req, res)
		.catch({code: ErrorCode.EmailTaken.code}, (e) => {
			return res.badRequest(ErrorCode.EmailTaken)
		})
		.catch({code: ErrorCode.UsernameTaken.code}, (e) => {
			return res.badRequest(ErrorCode.UsernameTaken)
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
				res.notFound(ErrorCode.BlacklistTokenNotFound)
			}
		})
	}

};
