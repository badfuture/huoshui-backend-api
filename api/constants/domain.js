

const DOMAIN_API = (process.env.NODE_ENV == 'production') ?
                  'https://api.huoshui.org' : 'http://localhost:1337'
const DOMAIN_WEBAPP = (process.env.NODE_ENV == 'production') ?
                  'https://webapp.huoshui.org' : 'http://localhost:8080'

module.exports = Object.freeze({
    DOMAIN_API,
    DOMAIN_WEBAPP,
    OBJECT_STORAGE: 'http://cdn.huoshui.org',
    URL_OAUTH_SUCCESS: `${DOMAIN_WEBAPP}/oauth_success`,
    URL_OAUTH_FAILURE: `${DOMAIN_WEBAPP}/oauth_error`,
})
