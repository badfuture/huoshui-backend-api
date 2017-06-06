/**
 * SearchController
 *
 * @description :: Server-side logic for managing Search
 */

const Promise = require('sequelize').Promise;
const _ = require('lodash')

module.exports = {

  find: function(req,res){

    // get search query string
    const query = req.allParams().query
    if (!query) {
      return res.badRequest('query parameter is required')
    }

    // get search scope
    const scope = req.allParams().scope

    // promise for course search
    const promiseFindCourse = () => {
      const defaultInclude = [
        { model: School, as: 'School'},
        { model: Prof, as: 'Prof'},
        { model: Dept, as: 'Depts'},
      ]
      const includeOption = ActionUtil.parsePopulate(req, defaultInclude, 'course')
      const whereOption = {
        $or: [
    			{ name: { $like: '%' + query + '%' } },
    			{ '$Prof.name$': { $like: '%' + query + '%' } }
    		]
      }
      return Course.findAll({
        where: whereOption,
        include: includeOption,
      })
    }

    // promise for prof search
    const promiseFindProf = () => {
      const defaultInclude = [
        { model: Dept, as: 'Depts'},
        { model: School, as: 'School'},
        { model: Position, as: 'Position'},
        { model: Tag, as: 'Tags'},
        { model: Course, as: 'Courses'}
      ]
      const includeOption = ActionUtil.parsePopulate(req, defaultInclude, 'prof')
      const whereOption = {
        $or: [
    			{ name: { $like: '%' + query + '%' } },
    		]
      }
      return Prof.findAll({
        where: whereOption,
        include: includeOption,
      })
    }

    // perform search
    const defaultScope = ['course', 'prof']
    const scopeOption = ActionUtil.parseScope(req, defaultScope)
    let promiseArr = []
    if (_.includes(scopeOption, 'course')) {
      promiseArr.push(promiseFindCourse())
    }
    if (_.includes(scopeOption, 'prof')) {
      promiseArr.push(promiseFindProf())
    }

    Promise.all(promiseArr)
    .spread((courses, profs) => {
      let result = {}
      if (courses) result.Courses = courses
      if (profs) result.Profs = profs
      return res.ok(result)
    })
    .catch((err) => {
      return res.serverError(err)
    })
  },

};
