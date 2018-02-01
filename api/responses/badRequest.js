
module.exports = function badRequest ({code, type, message}) {
  this.res.status(400)
  const errorJson = _.merge(ErrorCode.BadRequest, {
    code,
    type,
    message
  })

  const error = Errors.create(errorJson)
  this.res.jsonx(error.toJson())
}
