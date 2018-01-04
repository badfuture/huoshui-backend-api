
const {
  getIncludeModel, initInclude, getAllIncludes,
  applyCommonFilter,
} = require('./Utils')

module.exports = (includeList = []) => {
  let result = []
  const model = Tag

  if (typeof includeList == 'string' && includeList == 'all') {
    includeList = getAllIncludes(model)
  }

  includeList.forEach((include) => {
    if (!getIncludeModel(model, include)) { return }
    let obj = initInclude(model, include)
    obj = applyCommonFilter(model, include, obj)

    result.push(obj)
  })
  return result
}
