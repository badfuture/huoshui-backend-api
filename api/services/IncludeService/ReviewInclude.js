
const {
  getIncludeModel, initInclude, getAllIncludes,
  applyCommonFilter,
} = require('./Utils')

module.exports = (includeList = []) => {
  let result = []
  const model = Review

  if (typeof includeList == 'string' && includeList == 'all') {
    includeList = getAllIncludes(model)
  }

  includeList.forEach((include) => {
    if (!getIncludeModel(model, include)) { return }
    let obj = initInclude(model, include)
    if (include == "Comment") {
      obj.separate = false
      obj.include = [{
        model: Comment,
        as: 'Subcomments',
        separate: false,
        include: [
          { model: User, as: 'Author',
            attributes: {
              exclude: ['password', 'salt']
            }
          },
        ]
      }, {
        model: User,
        as: 'Author',
        attributes: {
          exclude: ['password', 'salt']
        }
      }]
    } else {
      obj = applyCommonFilter(include, obj)
    }

    result.push(obj)
  })
  return result
}
