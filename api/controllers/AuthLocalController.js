/**
 * AuthLocalController
 * @description :: Server-side logic for manage user's authorization
 */
const { UsernameExist, EmailExist } = ErrorService

module.exports = {
	login: function(req, res) {
		LocalAuthService.login(req, res)
	},

	signup: function(req, res) {
		LocalAuthService.signup(req, res)
		.catch(EmailExist, (e) => {
			return res.badRequest("user email already exists!")
		})
		.catch((UsernameExist, e) => {
			return res.badRequest("user username already exists!")
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
