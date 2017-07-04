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

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');


const sha512Encode = function(password, salt) {
  password = salt + password;
  var result = crypto.createHash('sha512').update(password).digest();
  for (var i = 0; i < 512; i++) {
    result = crypto.createHash('sha512').update(result).digest();
  }
  return result.toString('base64');
}

const getToken = function(req) {
  console.log(req.headers);
  const header = req.headers['authorization']
  return header.split(' ')[1]
}

module.exports = {
  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,

  hashPassword: (user) => {
    if (user.password && !user.salt) {
      salt = crypto.randomBytes(36).toString('base64');
      user.salt = salt;
      user.password = sha512Encode(user.password, user.salt);
    } else if (user.origin == 'leancloud' &&
      user.password && user.salt) { //leancloud user migration
      user.password = sha512Encode(user.password, user.salt);
    }
  },

  comparePassword: (password, user) => {
    var realPassword = user.password;
    var inputPassword = password;
    var salt = user.salt;

    hashedPassword = sha512Encode(inputPassword, salt);

    sails.log.debug("input: " + inputPassword);
    sails.log.debug("real: " + realPassword);
    sails.log.debug("hashed: " + hashedPassword);

    return (realPassword == hashedPassword) ? true : false;
  },

  createToken: (user) => {
    return jwt.sign({
        user: user.toJSON()
      },
      sails.config.jwtSettings.secret,
      {
        algorithm: sails.config.jwtSettings.algorithm,
        expiresIn: sails.config.jwtSettings.expiresInMinutes,
        issuer: sails.config.jwtSettings.issuer,
        audience: sails.config.jwtSettings.audience
      }
    )
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
