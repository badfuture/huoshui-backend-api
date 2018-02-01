/**
 * SeedController
 *
 * @description :: Server-side logic for seeding data
 */

module.exports = {
  seedDB: function(req, res) {
    const mode = req.param('mode')
    Meta.findAll()
		.then((results) => {
      let meta = results[0]
      if (meta && meta.seeded){
        return res.badRequest(ErrorCode.DatabaseAlreadySeeded)
      } else {
        if (mode === 'prod') {
          res.ok(`Starting to seed DB in ${mode} mode with full data!`)
          SeedService.seedDB(mode)
        } else if (mode === 'dev'){
          res.ok(`Starting to seed DB in ${mode} mode with partial data!`)
          SeedService.seedDB(mode)
        } else {
          return res.badRequest(ErrorCode.SeedModeNotRecognized)
        }

			}
		})
    .catch((err) => {
      res.serverError(err)
    })
	},

  cleanDB: (req, res) => {
    sequelize.sync({
      force: true
    }).then((result) => {
      return res.ok("DB reseted!")
    }).catch(() => {
      res.serverError("Database sync error!")
    })
  }
};
