/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 */

module.exports = {

  find: function(req,res){
    var defaultInclude = [
      { model: Dept, as: 'Dept'},
      { model: School, as: 'School'}
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    User.findAll({
      where: ActionUtil.parseWhere(req),
      limit: ActionUtil.parseLimit(req),
      offset: ActionUtil.parseSkip(req),
      order: ActionUtil.parseSort(req),
      include: includeOption
    }).then(function(recordsFound){
      return res.ok(recordsFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  findOne: function(req,res){
    var pk = ActionUtil.requirePk(req);
    var defaultInclude = [
      { model: Dept, as: 'Dept'},
      { model: School, as: 'School'}
    ];
    var includeOption = ActionUtil.parsePopulate(req, defaultInclude);

    User.findById(pk, {
      include: includeOption
    }).then(function(recordFound) {
      if(!recordFound) return res.notFound('No record found with the specified `id`.');
      res.ok(recordFound);
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  create: function(req,res){
    //handled in AuthController.signup
  },

  update: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var pk = ActionUtil.requirePk(req);
    var values = ActionUtil.parseValues(req);

    // Omit the path parameter `id` from values, unless it was explicitly defined
    // elsewhere (body/query):
    var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
    if (!idParamExplicitlyIncluded) delete values.id;

    if (typeof values[Model.primaryKey] !== 'undefined') {
      req._sails.log.warn('Cannot change primary key via update blueprint; ignoring value sent for `' + Model.primaryKey + '`');
    }
    delete values[Model.primaryKey];

    Model.findById(pk).then(function(matchingRecord) {

      if (!matchingRecord) return res.notFound();

      Model.update(values, { where: { id: pk }}).then(function(records) {
        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(util.format('Unexpected output from `%s.update`.', Model.globalId));
        }

        var updatedRecord = pk;

        var Q = Model.findById(updatedRecord, {include: req._sails.config.blueprints.populate ? [{ all: true }] : []})
        .then(function(populatedRecord) {
          if (!populatedRecord) return res.serverError('Could not find record after updating!');
          res.ok(populatedRecord);
        }).catch(function(err){
          return res.serverError(err);
        });
      }).catch(function(err){
        return res.negotiate(err);
      });
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  destroy: function(req,res){
    var Model = ActionUtil.parseModel(req);
    var pk = ActionUtil.requirePk(req);

    Model.findById(pk, { include: req._sails.config.blueprints.populate ? [{ all: true }] : []})
    .then(function(record) {
      if(!record) return res.notFound('No record found with the specified `id`.');
      Model.destroy({ where: { id: pk }}).then(function() {
        return res.ok(record);
      }).catch(function(err){
        return res.negotiate(err);
      });
    }).catch(function(err){
      return res.serverError(err);
    });
  },

  /**
   * Upload avatar for currently logged-in user
   * (POST /user/avatar)
   */
  uploadAvatar: (req, res) => {
    const imgDir = require('path').resolve(sails.config.appPath, 'assets/images')
    sails.log.debug('UserController: avatar upload local path', imgDir)


    var uuid = require('node-uuid')
    var filename = 'user_avatar_' + uuid.v1() + '.jpeg'

    req.file('avatar').upload({
      dirname: imgDir,
      maxBytes: 10000000, // limit upload size to ~10MB
      saveAs: (__newFileStream, next) => {
        return next(undefined, filename)
      }
    },function whenDone(err, files) {
      if (err) {
        return res.negotiate(err)
      }
      if (files.length === 0){
        return res.badRequest('No file was uploaded')
      }

      filename = require('path').basename(files[0].fd)
      sails.log.debug('UserController: avatar filename', filename)

      localPath = files[0].fd
      sails.log.debug('UserController: avatar local path', localPath)

      ObjectStorageService
      .upload(filename, localPath)
      .then((resp) => {
        const ossDomain = sails.config.objectStorage.domain
        return ossDomain + '/' + filename
      })
      .then((imgUrl) => {
        //TODO: update user after image upload
        res.ok()
      })
      .catch((err) => {
        res.serverError(err)
      })
    })
  },

  downloadAvatar: (req, res) => {
    // handled by object server provider
  },
};
