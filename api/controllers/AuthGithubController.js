/**
 * AuthGithubController
 * @description :: Server-side logic for manage user's authorization
 */

const axios = require('axios')
const Github = require("github")
const github = new Github()

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

module.exports = {
	login: function(req, res) {
		let code = req.param('code')
		sails.log.verbose("AuthGithubController: code", code)
		axios({
		  method: 'post',
		  url: 'https://github.com/login/oauth/access_token',
			headers: {'Accept': 'application/json'},
		  data: {
				code,
				client_id: 'aab07d7d9678decc4c77',
				client_secret: '84240773826c9a744f53c53bbac3ac5ff1bf20ef',
		  }
		})
	  .then(function (resp) {
			let token = resp.data.access_token
			sails.log.verbose("AuthGithubController: access_token", code)
			github.authenticate({
				type: "oauth",
				token: token
			});

			github.users.get({}, function(err, githubUser) {
				const userData = githubUser.data
				const { login, email, avatar_url } = userData
				const provider = 'github'

				User.findOne({
					where: {username: login, provider}
				}).then(function(userFound){
					const webUrl = 'http://localhost:8080'
					if (userFound) {
						// if oauth user already exsit, find and return user info
						const userUrlEncoded = encodeData(userFound)
						const tokenEncoded = encodeToken(CipherService.createJwtToken(userFound))
						return res.redirect(
							`${webUrl}?token=${tokenEncoded}&user=${userUrlEncoded}`
						)
					} else {
						// if oauth user not exist, create and return user info
						User.create({
							username: login,
							email,
							password: 'dummy_password',
							provider,
							avatar: avatar_url,
						})
						.then(function(userCreated){
							const userUrlEncoded = encodeData(userCreated)
							const tokenEncoded = encodeToken(CipherService.createJwtToken(userCreated))
							return res.redirect(
								`${webUrl}?token=${tokenEncoded}&user=${userUrlEncoded}`
							)
						});
					}
				}).catch(res.serverError);

			})

	  })
	  .catch(function (error) {
	    console.log(error);
	  })
	},

};
