module.exports = {
  validateOrder: (includes, sort) => {
    const res = includes.filter((include) => {
      return include.as == sort
    })
    return res.length != 0
  }
}
