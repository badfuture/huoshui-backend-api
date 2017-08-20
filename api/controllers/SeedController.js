/**
 * SeedController
 *
 * @description :: Server-side logic for seeding data
 */

module.exports = {
  seedDB: function(req, res) {
		Meta.findAll()
		.then((results) => {
      let meta = results[0]
      if (meta && meta.seeded){
        res.badRequest("Database is seeding or has already been seeded!")
      } else {
				res.ok("Starting to seed DB!")
				SeedService.seedDB()
			}
		})
		.catch((err) => {
			res.serverError(err)
		})
	}
};
