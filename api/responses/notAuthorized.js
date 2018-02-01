
module.exports = function notAuthorized ({code, type, message}) {
  this.res.status(403)
  const errorJson = _.merge(ErrorCode.NotAuthorized, {
    code,
    type,
    message
  })

  const error = Errors.create(errorJson)
  this.res.jsonx(error.toJson())
}
