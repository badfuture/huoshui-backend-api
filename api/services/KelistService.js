module.exports = {
  createDefaultKelist: () => {
    return Kelist.create({
      name: "我喜欢的课程",
      category: 'default_liked_courses',
      description: ''
    })
  }
}
