
// look up the model for this input
const modelLookup = (model, include) => {
  const rels = model.associations
  const rel = rels[include]
  return rel.target || false
}

const initPopulate = (model, include) => {
  let obj = {
    model: modelLookup(model, include),
    as: include,
    duplicating: false
  }
  return obj
}

module.exports ={
  findProfById: (id) => {
    return Prof.findOne({
      where: {id}
    })
  },

  findUserById: (id) => {
    return User.findOne({
      where: {id}
    })
  },

  // populate include option for User model
  populateUser: (includeList) => {
    let model = User
    let result = []
    includeList.forEach((include) => {
      if (!modelLookup(model, include)) { return }
      let obj = initPopulate(model, include)
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
      }

      result.push(obj)
    })
    return result
  }

}
