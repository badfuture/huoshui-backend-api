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
const { DOMAIN_API, DOMAIN_WEBAPP} = require('../constants/domain.js')

const encodeToken = (token) => {
	return encodeURIComponent(JSON.stringify(token))
}

const encodeData = (data) => {
	const dataPlain = data.get({plain: true})
	delete dataPlain.password;
	delete dataPlain.salt;
	const dataUrlEncoded = encodeURIComponent(JSON.stringify(dataPlain))
	return dataUrlEncoded
}

const prepareRedirectUrl = (baseUrl, user) => {
	const userUrlEncoded = encodeData(user)
	const tokenEncoded = encodeToken(CipherService.createToken(user))
	return `${baseUrl}?token=${tokenEncoded}&user=${userUrlEncoded}`
}

const getQueryParam = (query, variable) => {
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
    }
	}
}

// sample data: callback( {"client_id":"101410908","openid":"52F837003046BEC4AC09E7DC6EAC1B29"} );
const getOpenId = (data) => {
	let re = /callback\(\s+(.*?)\s+\);/
	let respJson = JSON.parse(data.match(re)[1])
	return respJson.openid
}

module.exports = {
	login: (req, res) => {
		const controller = req.options.controller
		const provider = 'qq'
		const client_id = '101410908'
		const client_secret = '216357c3962198f0d5f3b6b65cdfcc21'
		const redirectURI = `${DOMAIN_API}/auth/qq/callback`
		const webappUrl = `${DOMAIN_WEBAPP}`
		let access_token = ''
		let openId = ''
		let username = ''
		let avatar = ''
		let gender = ''
		const code = req.param('code')
		sails.log.warn("AuthQQController: code", code)
		sails.log.warn("AuthQQController: redirectURI", redirectURI)

		axios({
		  method: 'get',
		  url: 'https://graph.qq.com/oauth2.0/token',
		  params: {
				grant_type: 'authorization_code',
				client_id,
				client_secret,
				code,
				redirect_uri: redirectURI
		  }
		})
	  .then((resp) => {
			access_token = getQueryParam(resp.data, 'access_token')
			sails.log.warn("AuthQQController: token", access_token)

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
			sails.log.warn("AuthQQController: openID", openId)
			return axios({
				method: 'get',
				url: 'https://graph.qq.com/user/get_simple_userinfo',
				params: {
					access_token,
					oauth_consumer_key: client_id,
					openid: openId,
				}
			})
		})
		.then((resp) => {
			const userData = resp.data
			const { nickname, figureurl_2 } = userData
			username = nickname
			gender = userData.gender
			avatar = figureurl_2 || figureurl_qq_2
			return User.findOne({
				where: {
					provider,
					providerUid: openId,
				}
			})
		})
		.then((userFound) => {

			if (userFound) {
				sails.log.debug("AuthQQController")
				return res.redirect(prepareRedirectUrl(webappUrl, userFound))
			} else {
				// if oauth user not exist, create and return user info
				User.create({
					username,
					password: 'dummy_password',
					provider,
					avatar,
				})
				.then(function(userCreated){
					return res.redirect(prepareRedirectUrl(webappUrl, userCreated))
				})
			}
		})
		.catch((err) => {
	    sails.log.debug(err)
			res.serverError(err)
	  })
	},

};
