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

const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const sha512Encode = (password, salt) => {
  password = salt + password;
  var result = crypto.createHash('sha512').update(password).digest();
  for (var i = 0; i < 512; i++) {
    result = crypto.createHash('sha512').update(result).digest();
  }
  return result.toString('base64');
}

const getToken = (req) => {
  const header = req.headers['authorization']
  return header.split(' ')[1]
}

module.exports = {
  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,

  hashPassword: (user) => {
    // generate salt and password if salt not exist
    if (user.password && !user.salt) {
      user.salt = crypto.randomBytes(36).toString('base64')
      user.password = sha512Encode(user.password, user.salt)
    }
  },

  verifyPassword: (password, user) => {
    // verify claimed password with stored password
    const storedPassword = user.password
    const storedSalt = user.salt

    const claimedPassword = password
    const hashedPassword = sha512Encode(claimedPassword, storedSalt)
    return (storedPassword == hashedPassword)
  },

  createJwtToken: (user) => {
    // create JWT token
    const { algorithm, expiresIn, issuer, audience } = sails.config.jwtSettings
    const payload = { user: user.toJSON() }
    const secret = sails.config.jwtSettings.secret
    const options = {
      algorithm,
      expiresIn,
      issuer,
      audience
    }
    return jwt.sign(payload, secret, options)
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
