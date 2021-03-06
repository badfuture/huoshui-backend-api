
const encodeToken = (token) => {
	return encodeURIComponent(JSON.stringify(token))
}

module.exports = {
	stringifyData: (data) => {
		const dataPlain = data.get({plain: true})
		return JSON.stringify(dataPlain)
	},

	getQueryParam: (query, variable) => {
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
	    var pair = vars[i].split('=');
	    if (decodeURIComponent(pair[0]) == variable) {
				return decodeURIComponent(pair[1]);
	    }
		}
	},

  prepareRedirectUrl: (baseUrl, token, state) => {
  	const tokenEncoded = encodeToken(token)
  	return `${baseUrl}?token=${tokenEncoded}&state=${state}`
  },

  getUrlAccountLinked: (baseUrl) => {
  	return `${baseUrl}?error=true&is_account_linked=true`
  },

  getUrlAccountUnlinked: (baseUrl) => {
  	return `${baseUrl}?error=true&is_account_unlinked=true`
  },

  getUrlCannotUnlink: (baseUrl) => {
  	return `${baseUrl}?error=true&cannot_unlink=true`
  },

  getUrlAlreadyLinked: (baseUrl) => {
  	return `${baseUrl}?error=true&already_linked_another_account=true`
  },
}
