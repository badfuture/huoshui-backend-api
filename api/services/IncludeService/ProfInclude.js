
const {
  getIncludeModel, initInclude, getAllIncludes,
  applyCommonFilter,
} = require('./Utils')

module.exports = (includeList = []) => {
  let result = []
  const model = Prof

  if (typeof includeList == 'string' && includeList == 'all') {
    includeList = getAllIncludes(model)
  }

  includeList.forEach((include) => {
    if (!getIncludeModel(model, include)) { return }
    let obj = initInclude(model, include)
    if (include == "Reviews") {
      delete obj.duplicating
      obj.include = [
        {
          model: User,
          as: 'Author',
          attributes: {
            exclude: ['password', 'salt']
          }
        },
        {
          model: Course,
          as: 'Course'
        },
        {
          model: Prof,
          as: 'Prof'
        },
        {
          model: Tag,
          as: 'Tags'
        }
      ]
    } else if (include == "Courses") {
      obj.include = [
        {
          model: Dept,
          as: 'Depts',
        },
      ]
    } else {
      obj = applyCommonFilter(model, include, obj)
    }

    result.push(obj)
  })
  return result
}
