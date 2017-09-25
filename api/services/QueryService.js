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
  }

}
