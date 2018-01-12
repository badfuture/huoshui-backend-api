module.exports = function(req, res, next) {
  const user = req.user
  User.findOne({
    where: { id: user.id },
    include: [{
      model: Role,
      as: 'Roles',
      where: {
        name: 'admin'
      }
    }]
  })
  .then((user) => {
    if (!user) {
      res.unauthorized()
    } else {
      next()
    }
  })
}
