
var _ = require('lodash');
var flaverr = require('flaverr');

module.exports = {

  parseSort: function (req) {
    var sort = req.param('sort')
    if (_.isUndefined(sort)) {return undefined;}

    // If `sort` is a string, attempt to JSON.parse() it.
    // (e.g. `{"name": 1}`)
    if (_.isString(sort)) {
      try {
        sort = JSON.parse(sort);
      }
      // If it is not valid JSON, then fall back to interpreting it as-is.
      // (e.g. "name ASC")
      catch(e) {}
    }
    return sort;
  },

  parseSkip: function (req) {
    var DEFAULT_SKIP = req._sails.config.query.defaultSkip || 0;
    var skip = req.param('skip') || DEFAULT_SKIP;
    if (skip) { skip = +skip; }
    return skip;
  },

  parseLimit: function (req) {
    var DEFAULT_LIMIT = req._sails.config.query.defaultLimit || 30;
    var limit = req.param('limit') || DEFAULT_LIMIT;
    if (limit) { limit = +limit; }
    return limit;
  },

  parseWhere: function ( req ) {
    var blacklist = ['limit', 'skip', 'sort', 'populate'];
    var where = req.allParams().where;

    // If `where` parameter is a string, try to interpret it as JSON.
    // (If it cannot be parsed, throw a UsageError.)
    if (_.isString(where)) {
      try {
        where = JSON.parse(where);
      } catch (e) {
        throw flaverr({ name: 'UsageError' }, new Error('Could not JSON.parse() the provided `where` clause. Here is the raw error: '+e.stack));
      }
    }

    // If `where` has not been specified, but other unbound parameter variables
    // **ARE** specified, build the `where` option using them.
    if (!where) {
      where = req.allParams();
      where = _.omit(where, blacklist);
      where = _.omit(where, function(p) {
        if (_.isUndefined(p)) { return true; }
      });
    }
    return where;
  },



}
