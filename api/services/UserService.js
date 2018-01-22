module.exports = {
  getUserFullInfo: (id) => {
		return User.findOne({
			where: { id },
			include: IncludeService.UserInclude('all')
		})
  }

}
