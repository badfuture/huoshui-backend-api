/**
 * AuthWeiboController
 * @description :: Server-side logic for manage user's authorization
 *
 sample Weibo user info
 { id: 6298778462,
  idstr: '6298778462',
  class: 1,
  screen_name: 'supermanze',
  name: 'supermanze',
  province: '51',
  city: '1000',
  location: '四川',
  description: '',
  url: '',
  profile_image_url: 'http://tvax4.sinaimg.cn/crop.420.221.1137.1137.50/006Sh210ly8fh3k64x78wj31kw16o7wh.jpg',
  cover_image: 'http://wx3.sinaimg.cn/crop.0.0.920.300/006Sh210gy1fh671wg32zj30pk08cnbb.jpg',
  cover_image_phone: 'http://ww3.sinaimg.cn/crop.0.0.640.640.640/6ce2240djw1e9oao0dwofj20hs0hsjxc.jpg',
  profile_url: 'u/6298778462',
  domain: '',
  weihao: '',
  gender: 'f',
  followers_count: 3,
  friends_count: 59,
  pagefriends_count: 0,
  statuses_count: 0,
  favourites_count: 0,
  created_at: 'Tue Jun 27 21:14:26 +0800 2017',
  following: false,
  allow_all_act_msg: false,
  geo_enabled: true,
  verified: false,
  verified_type: -1,
  remark: '',
  insecurity: { sexual_content: false },
  ptype: 0,
  allow_all_comment: true,
  avatar_large: 'http://tvax4.sinaimg.cn/crop.420.221.1137.1137.180/006Sh210ly8fh3k64x78wj31kw16o7wh.jpg',
  avatar_hd: 'http://tvax4.sinaimg.cn/crop.420.221.1137.1137.1024/006Sh210ly8fh3k64x78wj31kw16o7wh.jpg',
  verified_reason: '',
  verified_trade: '',
  verified_reason_url: '',
  verified_source: '',
  verified_source_url: '',
  follow_me: false,
  online_status: 0,
  bi_followers_count: 0,
  lang: 'zh-cn',
  star: 0,
  mbtype: 11,
  mbrank: 1,
  block_word: 0,
  block_app: 1,
  credit_score: 80,
  user_ability: 0,
  urank: 0,
  story_read_state: -1 }
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

module.exports = {
	login: (req, res) => {
		const controller = req.options.controller
		const provider = 'weibo'
		const client_id = '3486860384'
		const client_secret = '526fc595b736390ad23d280b40fee1bd'
		const redirectURI = `${DOMAIN_API}/auth/weibo/callback`
		const webappUrl = `${DOMAIN_WEBAPP}`
		let access_token = ''
		let providerUid = ''
		let username = ''
		let avatar = ''
		let gender = ''
		const code = req.param('code')
		const error = req.param('error')
		if (error) {
			return res.redirect(webappUrl + '?error=' + error)
		}

		sails.log.warn("AuthWeiboController: code", code)
		sails.log.warn("AuthWeiboController: redirectURI", redirectURI)

		axios({
		  method: 'post',
		  url: 'https://api.weibo.com/oauth2/access_token',
		  params: {
				grant_type: 'authorization_code',
				client_id,
				client_secret,
				code,
				redirect_uri: redirectURI
		  }
		})
	  .then((resp) => {
			sails.log.verbose("AuthWeiboController: token response", resp.data)
			access_token = resp.data.access_token
			sails.log.warn("AuthWeiboController: token", access_token)

			return axios({
			  method: 'post',
			  url: 'https://api.weibo.com/oauth2/get_token_info',
			  params: {
					access_token
			  }
			})
		})
		.then((resp) => {
			providerUid = resp.data.uid
			sails.log.warn("AuthWeiboController: provider uid ", providerUid)
			return axios({
				method: 'get',
				url: 'https://api.weibo.com/2/users/show.json',
				params: {
					access_token,
					uid: providerUid
				}
			})
		})
		.then((resp) => {
			sails.log.verbose("AuthWeiboController: user info ", resp.data)
			const userData = resp.data
			const { screen_name, avatar_large, avatar_hd, idstr } = userData
			username = screen_name
			providerUid = idstr
			gender = userData.gender
			avatar = avatar_large || avatar_hd
			return User.findOne({
				where: {
					provider,
					providerUid,
				},
				include: QueryService.populateUser(['Reviews']),
			})
		})
		.then((userFound) => {

			if (userFound) {
				sails.log.debug("AuthWeiboController")
				return res.redirect(prepareRedirectUrl(webappUrl, userFound))
			} else {
				// if oauth user not exist, create and return user info
				User.create({
					username,
					password: 'dummy_password',
					provider,
					providerUid,
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
