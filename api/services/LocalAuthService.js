const passport = require('passport')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const sha512Encode = (password, salt) => {
  password = salt + password;
  var result = crypto.createHash('sha512').update(password).digest();
  for (var i = 0; i < 512; i++) {
    result = crypto.createHash('sha512').update(result).digest();
  }
  return result.toString('base64');
}

const _onLocalAuth = (req, res, error, userLocal, info) => {
	if (error) return res.serverError(error)
	if (!userLocal) return res.unauthenticated(null, info && info.code, info && info.message)

	let user = null
	userLocal.getUser()
	.then((userFound) => {
		user = userFound
		return User.findOne({
			where: { id: user.id},
			include: IncludeService.UserInclude('all')
		})
	})
	.then((userFullInfo) => {
		return res.ok({
			token: JwtService.createJwtToken(user),
			user: userFullInfo
		})
	})
}

module.exports = {
  login: (req, res) => {
    passport.authenticate('local', _onLocalAuth.bind(this, req, res))(req, res)
  },

  signup: (req, res) => {
		const {
      username,
      email,
      password,
      firstYear,
      deptId,
      schoolId = '1',
    } = req.allParams()

		sails.log.debug(`sign up email: ${email} | username ${username}`)
		let userCreated = null
		let userLocalCreated = null
		let jwtToken = null

		return UserLocal.findOne({
			where: { email }
		})
		.then((userLocal) => {
			if (userLocal) {
				throw new ErrorModel.err(ErrorCode.EmailTaken)
			}
		})
    .then(() => {
			return User.findOne({
				where: { username }
			})
    })
		.then((user) => {
			if (user) {
				throw new ErrorModel.err(ErrorCode.UsernameTaken)
			}
		})
		.then(() => {
			return User.create({
				username, email, firstYear,
        isInitialized: true,
			})
		})
		.then((result) => {
			userCreated = result
			jwtToken = JwtService.createJwtToken(userCreated)
			return UserLocal.create({
				email, password
			})
		})
		.then((result) => {
			userLocalCreated = result
			return userCreated.setUserLocal(userLocalCreated)
		})
		.then(() => {
			return KelistService.createDefaultKelist()
		}).then((defaultKelist) => {
			return userCreated.addOwnsKelists(defaultKelist)
		}).then(() => {
			return userCreated.setSchool(schoolId)
		}).then(() => {
			return userCreated.setDept(deptId)
		}).then(() => {
			return UserService.getUserFullInfo(userCreated.id)
		}).then((userFullInfo) => {
			return res.ok({
				token: jwtToken,
				user: userFullInfo
			})
		})
  },

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
}
