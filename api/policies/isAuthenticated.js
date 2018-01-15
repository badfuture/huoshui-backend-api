/**
 * isAuthenticated
 * @description :: Policy to inject user in req via JSON Web Token
 */
var passport = require('passport');

module.exports = function(req, res, next) {
  JwtService.authenticate(req, res, next)
}
