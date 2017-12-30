
// passport strategies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var EXPIRES_IN_MINUTES = 60 * 24 * 30 * 12; // one year
var SECRET = process.env.tokenSecret || "huoshui_rock";
var ALGORITHM = "HS256";
var ISSUER = "api.huoshui.org"; //issuer of the JWT
var AUDIENCE = "huoshui.org"; //resource being acccessed


// Configuration object for local strategy
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

// Configuration object for JWT strategy
var JWT_STRATEGY_CONFIG = {
  secretOrKey: SECRET,
  issuer: ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// Triggers after user is authenticated via local strategy
function _onLocalStrategyAuth(email, password, next) {
  User.findOne({
      where: {email: email},
      include: IncludeService.UserInclude(['Reviews']),
    })
    .then((user) => {
      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: email + ' is not found'
      });

      if (!CipherService.comparePassword(password, user))
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });

      return next(null, user, {});
    })
    .catch((err) => {
      sails.log.error(err.message);
      next(err);
    });
}

// Triggers after user is authenticated via JWT strategy
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {});
}

passport.use(
  new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
  expiresInMinutes: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm: ALGORITHM,
  issuer: ISSUER,
  audience: AUDIENCE
};
