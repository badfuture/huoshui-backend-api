/**
 * SeedController
 *
 * @description :: Server-side logic for seeding data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  seedDB: function(req, res) {
		SeedService.seedDB();
	}
};
