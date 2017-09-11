/**
 * Route Mappings
 */

var indexRoute = require('../api/routes/indexRoute');
var authRoute = require('../api/routes/authRoute');
var commentRoute = require('../api/routes/commentRoute');
var courseRoute = require('../api/routes/courseRoute');
var courseStatsRoute = require('../api/routes/courseStatsRoute');
var deptRoute = require('../api/routes/deptRoute');
var positionRoute = require('../api/routes/positionRoute');
var profRoute = require('../api/routes/profRoute');
var reviewRoute = require('../api/routes/reviewRoute');
var schoolRoute = require('../api/routes/schoolRoute');
var swaggerRoute = require('../api/routes/swaggerRoute');
var tagRoute = require('../api/routes/tagRoute');
var userRoute = require('../api/routes/userRoute');
var feedbackRoute = require('../api/routes/feedbackRoute');
var searchRoute = require('../api/routes/searchRoute');
var statRoute = require('../api/routes/statRoute');
var jobRoute = require('../api/routes/jobRoute');
var otherRoute = require('../api/routes/otherRoute');

// Dynamic include custom routes from api
var routes = function (routes) {
  var obj = {};
  routes.forEach(function (route) {
    for (path in route) {
      obj[path] = route[path];
    }
  })
  return obj;
}

module.exports.routes = routes([
  indexRoute,
  authRoute,
  commentRoute,
  courseRoute,
  courseStatsRoute,
  deptRoute,
  positionRoute,
  profRoute,
  reviewRoute,
  schoolRoute,
  swaggerRoute,
  tagRoute,
  userRoute,
  feedbackRoute,
  searchRoute,
  statRoute,
  jobRoute,
  otherRoute
]);
