/**
 * SeedController
 *
 * @description :: Server-side logic for seeding data
 */

var publisher = sails.hooks.publisher;

module.exports = {
  seedDB: function(req, res) {

    var job = publisher.create('seed_service').priority('medium').save();
		SeedService.seedDB(req, res);
	}
};
