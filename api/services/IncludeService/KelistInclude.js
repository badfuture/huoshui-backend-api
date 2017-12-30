
const {
  getIncludeModel, initInclude, getAllIncludes,
  applyCommonFilter,
} = require('./Utils')

module.exports = (includeList = []) => {
  let result = []
  const model = Kelist

  if (typeof includeList == 'string' && includeList == 'all') {
    includeList = getAllIncludes(model)
  }

  includeList.forEach((include) => {
    if (!getIncludeModel(model, include)) { return }
    let obj = initInclude(model, include)
    if (include == "Courses") {
      obj.through = {
        as: 'meta',
        attributes: ['brief_comment']
      }
    } else {
      obj = applyCommonFilter(include, obj)
    }

    result.push(obj)
  })
  return result
}
