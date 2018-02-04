/**
 * AuthQQController
 * @description :: Server-side logic for manage user's authorization
 *
 sample QQ user info
 { ret: 0,
	 msg: '',
	 is_lost: 0,
	 nickname: 'Paladinze',
	 gender: '男',
	 province: '',
	 city: '卡尔巴卡尔',
	 figureurl: 'http://qzapp.qlogo.cn/qzapp/101410908/52F837003046BEC4AC09E7DC6EAC1B29/30',
	 figureurl_1: 'http://qzapp.qlogo.cn/qzapp/101410908/52F837003046BEC4AC09E7DC6EAC1B29/50',
	 figureurl_2: 'http://qzapp.qlogo.cn/qzapp/101410908/52F837003046BEC4AC09E7DC6EAC1B29/100',
	 figureurl_qq_1: 'http://q.qlogo.cn/qqapp/101410908/52F837003046BEC4AC09E7DC6EAC1B29/40',
	 figureurl_qq_2: 'http://q.qlogo.cn/qqapp/101410908/52F837003046BEC4AC09E7DC6EAC1B29/100',
	 is_yellow_vip: '0',
	 vip: '0',
	 yellow_vip_level: '0',
	 level: '0',
	 is_yellow_year_vip: '0' }
 */

const axios = require('axios')
const {
	DOMAIN_API,
	URL_OAUTH_SUCCESS,
	URL_OAUTH_FAILURE,
} = require('../constants/domain.js')

// sample data: callback( {"CLIENT_ID":"101410908","openid":"52F837003046BEC4AC09E7DC6EAC1B29"} );
const getOpenId = (data) => {
	let re = /callback\(\s+(.*?)\s+\);/
	let respJson = JSON.parse(data.match(re)[1])
	return respJson.openid
}

module.exports = {
	login: (req, res) => {
		const CLIENT_ID = '101410908'
		const CLIENT_SECRET = '216357c3962198f0d5f3b6b65cdfcc21'
		let userCreated = null
		let userFound = null
		let userQQCreated = null
		let userQQFound = null
		let access_token = ''
		let openId = ''
		let username = ''
		let avatar = ''
		let gender = ''

		const code = req.param('code')
		sails.log.debug("AuthQQController: code", code)
		const state = req.param('state')
		sails.log.debug("AuthQQController: state", state)
		const redirectURI = `${DOMAIN_API}/auth/qq/callback`
		sails.log.debug("AuthQQController: redirectURI", redirectURI)

		axios({
		  method: 'get',
		  url: 'https://graph.qq.com/oauth2.0/token',
		  params: {
				grant_type: 'authorization_code',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code,
				redirect_uri: redirectURI
		  }
		})
	  .then((resp) => {
			console.log(resp.data)
			access_token = OauthService.getQueryParam(resp.data, 'access_token')
			sails.log.debug("AuthQQController: access token", access_token)

			return axios({
			  method: 'get',
			  url: 'https://graph.qq.com/oauth2.0/me',
			  params: {
					access_token
			  }
			})
		})
		.then((resp) => {
			openId = getOpenId(resp.data)
			sails.log.debug("AuthQQController: openID", openId)
			return axios({
				method: 'get',
				url: 'https://graph.qq.com/user/get_simple_userinfo',
				params: {
					access_token,
					oauth_consumer_key: CLIENT_ID,
					openid: openId,
				}
			})
		})
		.then((resp) => {
			const {
				nickname: username,
				figureurl_qq_2: avatar,
				gender
			} = resp.data

			UserQQ.findOne({
				where: { providerId: openId }
			})
			.then((result) => {
				userQQFound = result
				if (!userQQFound) {
					// if oauth account not found (yes)
					// 	create oauth account (yes)
					// 	if user currently logged in (yes)
					// 		check if desired oauth account type already linked (yes)
					// 		if already linked (yes)
					// 			throw error "cannot bind multiple accounts of the same type" (yes)
					// 		if this oauth type not linked yet (yes)
					// 			link the oauth account to the current user account (yes)
					// 	else if not already logged in (yes)
					// 		create a new user (yes)
					// 		link the newly created oauth account to the newly created user (yes)
					UserQQ.create({
						providerId: openId
					}).then((result) => {
						userQQCreated = result
						if (req.user) {
							sails.log.debug('user logged in + oauth account not exist: create oauth account and link with User')
							return UserService.getUserFullInfo(req.user.id)
							.then((result) => {
								userFound = result
								return userFound.getUserQQ()
							})
							.then((result) => {
								if (result) {
									return res.badRequest(ErrorCode.BindSameAccountTypeTwice)
								} else {
									return userFound.setUserQQ(userQQCreated)
									.then(() => {
										//return boolean indicating account linked
										return res.redirect(OauthService.getUrlAccountLinked(URL_OAUTH_SUCCESS))
									})
								}
							})

						} else {
							sails.log.debug('user not logged in + oauth account not exist: create user and oauth account')
							return User.create({
								avatar, gender,
								isInitialized: false,
							}).then((result) => {
								userCreated = result
								userQQCreated.isFirstAccount = true
								userQQCreated.save()
								return userCreated.setUserQQ(userQQCreated)
							}).then(() => {
								return UserService.getUserFullInfo(userCreated.id)
							}).then((result) => {
								sails.log.verbose(result.get({plain: true}))
								res.cookie('user', OauthService.stringifyData(result))
								const token = JwtService.createJwtToken(userCreated)
								res.cookie('token', token)
								return res.redirect(OauthService.prepareRedirectUrl(URL_OAUTH_SUCCESS, token, state))
							})
						}
					})
				} else {
					// if oauth account found (yes)
					// 	if user currently logged in (yes)
					// 		get logged in User id (yes)
					// 		get id of the user owns the oauth account (yes)
					// 		if id is the same (yes)
					// 			if not first account (yes)
					// 				unlink the oauth account (yes)
					// 			if first account (yes)
					// 				throw error: cannot unlink first account (yes)
					// 		if different (yes)
					// 			prompt error "this QQ account is already linked to another user" (yes)
					// 	if not already logged in (yes)
					// 		get the user owning the oauth account
					// 		return user info
					if (req.user) {
						sails.log.debug('user logged in + oauth account exist and linked: unlink')
						userQQFound.getUser()
						.then((result) => {
							userFound = result
							if (userFound.id == req.user.id) {
								if (!userQQFound.isFirstAccount) {
									// unlink account
									userFound.setUserQQ(null)
									.then(() => {
										return res.redirect(OauthService.getUrlAccountUnlinked(URL_OAUTH_SUCCESS))
									})
								} else {
									// throw error: cannot unlink first account
									return res.redirect(OauthService.getUrlCannotUnlink(URL_OAUTH_SUCCESS))
								}
							} else {
								// throw error: already linked to another user
								return res.redirect(OauthService.getUrlAlreadyLinked(URL_OAUTH_SUCCESS))
							}
						})

					} else {
						sails.log.debug('user not logged in + oauth account exist：return user full info')
						UserService.getUserFullInfo(userQQFound.user_id)
						.then((userFullInfo) => {
							res.cookie('user', OauthService.stringifyData(userFullInfo))
							return User.findById(userQQFound.user_id)
						})
						.then((UserBasicInfo) => {
							const token = JwtService.createJwtToken(UserBasicInfo)
							res.cookie('token', token)
							return res.redirect(OauthService.prepareRedirectUrl(URL_OAUTH_SUCCESS, token, state))
						})
					}
				}
			})
		})
		.catch((err) => {
			res.serverError(err)
	  })
	},

};
