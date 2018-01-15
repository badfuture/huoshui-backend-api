const Promise = require('bluebird')

module.exports = {
  EmailExist: () => {
    EmailExist.prototype = Object.create(Promise.OperationalError.prototype)
  },
  UsernameExistError: () => {
    UsernameExist.prototype = Object.create(Promise.OperationalError.prototype)
  },
}
