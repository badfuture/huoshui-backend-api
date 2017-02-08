/**
 * SeedController
 *
 * @description :: Server-side logic for seeding data
 */

module.exports = {
  seedDB: function(req, res) {
		if (!sails.isSeeded) {
			res.ok("seeding is started!");
			sails.isSeeded = true;
			SeedService.seedDB();
		} else {
			res.ok("seeding is already done! Skip seeding...");
		}
	}
};
