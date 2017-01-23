/**
 * SwaggerController
 *
 * @description :: Server-side logic for generating swagger documentation
 */

module.exports = {

  getSwaggerDocJson: function(req, res) {
    SwaggerService.generateDocJson(this, res);
  }
};
