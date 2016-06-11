/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	hi: function(req, res) {
		School
			.findOneById('5741978d20c7976b9bd4503f')
			.exec(function(err, obj) {
				obj.campus = 'crazy';
				obj.save(function(err, savedUser) {});
			});



		console.log("hi");
		return res.send("Hi there!");
	},
};
