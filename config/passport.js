const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

/**
 * basic auth configuration
 */
const PASSPORT_LOCAL_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
}

const preprocessLocalAuth = (email, password, next) => {
  User.findOne({
      where: {
        email: email
      }
    })
    .then((user) => {
      // return if user is not found
      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: email + ' is not found'
      })

      // return if password incorrect
      if (!CipherService.verifyPassword(password, user)) {
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        })
      }
      return next(null, user, {})
    })
    .catch((err) => {
      sails.log.error(err.message)
      next(err)
    })
}
passport.use(new LocalStrategy(PASSPORT_LOCAL_CONFIG, preprocessLocalAuth))


/**
 * JWT auth configuration
 */
const JWT_CONFIG = {
  expiresIn: '90d', // three months in seconds
  secret: process.env.tokenSecret || "huoshui_rock",
  algorithm: "HS256",
  issuer: "api.huoshui.org", // issuer of JWT
  audience: "api.huoshui.org", // resource being acccessed
}

const PASSPORT_JWT_CONFIG = {
  secretOrKey: JWT_CONFIG.secret,
  issuer: JWT_CONFIG.issuer,
  audience: JWT_CONFIG.audience,
  passReqToCallback: false,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const preprocessJWTAuth = (payload, next) => {
  var user = payload.user
  return next(null, user, {})
}
passport.use(new JwtStrategy(PASSPORT_JWT_CONFIG, preprocessJWTAuth))

// export jwt config
module.exports.jwtSettings = JWT_CONFIG
