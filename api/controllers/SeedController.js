/**
 * SeedController
 *
 * @description :: Server-side logic for seeding data
 */

module.exports = {
  seedDB: function(req, res) {
    const mode = req.param('mode')
    if (mode === 'clean') {
      sequelize.sync({
        force: true
      }).then((result) => {
        return res.ok("DB reseted!")
      }).catch(() => {
        res.serverError("Database sync error!")
        return next()
      })
    } else {
      Meta.findAll()
  		.then((results) => {
        let meta = results[0]
        if (meta && meta.seeded){
          res.badRequest("Database is seeding or has already been seeded!")
        } else {
          if (mode === 'prod') {
            res.ok(`Starting to seed DB in ${mode} mode with full data!`)
            SeedService.seedDB(mode)
          } else if (mode === 'dev'){
            res.ok(`Starting to seed DB in ${mode} mode with partial data!`)
            SeedService.seedDB(mode)
          } else {
            res.badRequest('Seeding needs to be in either "dev" or "prod" mode!')
          }

  			}
  		})
      .catch((err) => {
        res.serverError(err)
      })
    }
	}
};
