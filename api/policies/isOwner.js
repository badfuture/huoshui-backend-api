module.exports = function(req, res, next) {
  const user = req.user
  const ownerId = req.param('userId')

  if (user && user.id == ownerId) {
    next()
  } else {
    return res.notAuthorized({})
  }
}
