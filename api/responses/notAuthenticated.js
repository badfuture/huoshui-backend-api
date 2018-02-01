
module.exports = function notAuthenticated ({code, type, message}) {
  this.res.status(401)
  const errorJson = _.merge(ErrorCode.NotAuthenticated, {
    code,
    type,
    message
  })

  const error = Errors.create(errorJson)
  this.res.jsonx(error.toJson())
}
