
const {
  getIncludeModel, initInclude, getAllIncludes,
  applyCommonFilter,
} = require('./Utils')

module.exports = (includeList = []) => {
  let result = []
  const model = User

  if (typeof includeList == 'string' && includeList == 'all') {
    includeList = getAllIncludes(model)
  }

  includeList.forEach((include) => {
    if (!getIncludeModel(model, include)) { return }
    let obj = initInclude(model, include)
    if (include == "Reviews") {
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
    } else if (include == 'LikedProfs') {
      obj.include = [
        {
          model: Dept,
          as: 'Depts'
        },
        {
          model: Position,
          as: 'Position'
        }
      ]
    } else if (include == 'LikedCourses') {
      obj.include = [
        {
          model: Dept,
          as: 'Depts'
        },
        {
          model: Prof,
          as: 'Prof'
        }
      ]
    } else if (include == 'Roles') {
      obj.through = {
        attributes: []
      }
    } else {
      obj = applyCommonFilter(model, include, obj)
    }

    result.push(obj)
  })
  return result
}
