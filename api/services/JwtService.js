/*
JWT Token shape
{ user:
   { id: 8,
     username: 'pala2',
     provider: 'local',
     providerUid: null,
     email: 'paladinze@hotmail.com',
     firstYear: null,
     avatar: null,
     gender: null,
     created_at: '2017-07-04T17:07:49.718Z',
     updated_at: '2017-07-04T17:07:49.718Z',
     dept_id: null,
     role_id: null,
     school_id: null },
  iat: 1499188784,
  exp: 1499231984,
  aud: 'https://api.huoshui.org',
  iss: 'https://api.huoshui.org' }
 */

const jwt = require('jsonwebtoken')
const uuid = require('node-uuid')
const passport = require('passport')

const getToken = (req) => {
  const header = req.headers['authorization']
  return header.trim().split(/\ +/)[1]
}

module.exports = {

	authenticate: (req, res, next) => {
	  passport.authenticate('jwt', function(error, user, info) {
	    if (error) return res.serverError(error)
	    if (!user) return res.unauthenticated(null, info && info.code, info && info.message)

			// inject user into req, to be used further down in the pipeline
	    req.user = user

			Token.findOne({
				where: {
					jwtId: JwtService.getJwtId(req),
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

  getJwtId: (req) => {
    const token = getToken(req)
    const { secret } = sails.config.jwtSettings
    const decoded = jwt.verify(token, secret)
    return decoded.jti
  },

  createJwtToken: (user) => {
    // create JWT token
    const { algorithm, expiresIn, issuer, audience } = sails.config.jwtSettings
    const jwtid = uuid.v1()
    const subject = `user:${user.id}`

    const payload = { user: user.toJSON() }
    const secret = sails.config.jwtSettings.secret
    const options = {
      algorithm,
      expiresIn,
      issuer,
      audience,
      jwtid,
      subject,
    }
    const signedToken = jwt.sign(payload, secret, options)

    // store token
    Token.create({
      jwt: signedToken,
      jwtId: jwtid,
      userId: user.id,
    })
    return signedToken
  },

   verifyTokenAsync: (token, callback) => {
     return jwt.verify(
       token, // The token to be verified
       sails.config.jwtSettings.secret, // Same token used to sign
       {}, // No Option
       callback //Pass errors or decoded token to callback
     )
   },

   verifyToken: (req) => {
     const token = getToken(req)
     return jwt.verify(
       token,
       sails.config.jwtSettings.secret
     )
   },
}
