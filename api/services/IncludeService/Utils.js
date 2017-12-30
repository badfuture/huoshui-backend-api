
/**
 * get the model name for a relation of a model
 * @param  {Sequelize.Modal} model   model being queried
 * @param  {string} include relation to be included
 * @return {*}         model name of the relation
 */
const getIncludeModel = (model, include) => {
  const rels = model.associations
  const rel = rels[include]
  return rel.target || false
}

/**
 * initialize the include obj to be used for query
 * @param  {string} model   model being queried
 * @param  {string} include relation to be included
 * @return {object}  obj to be used for query
 */
const initInclude = (model, include) => {
  let obj = {
    model: getIncludeModel(model, include),
    as: include,
    duplicating: false,
  }
  if(model.associations[include].associationType === 'HasMany') {
    if (model != Course && model != Prof) {
      obj.limit = 30
    }
  }
  return obj
}

const applyCommonFilter = (include, obj) => {
  // hide creds when including User
  if (include === 'User') {
    obj.attributes = {
      exclude: ['password', 'salt']
    }
  }

  // include count in Tag's metadata
  if (include == 'Tags') {
    obj.through = {
      as: 'stat',
      attributes: ['count']
    }
  }

  // set nested include for Review
  if (include == 'Review') {
    obj.through = {
      attributes: []
    }
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
  }
  return obj
}

// get a list of all possible includes
const getAllIncludes = (model) => {
  const relations = model.associations
  includeList = []
  _.each(relations, (rel) => {
    includeList.push(rel.options.as)
  })
  return includeList
}

module.exports = {
  getIncludeModel,
  initInclude,
  getAllIncludes,
  applyCommonFilter,
}
