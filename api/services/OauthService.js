module.exports = {
  // convert weibo profile to huoshui user format
  formatWeiboProfile: (raw) => {
    let user = {}
    user.provider = 'weibo'
    user.providerUid = raw.idstr
    user.username = raw.screen_name || raw.name
    user.password = 'DUMMY_PASSWORD'
    if (raw.gender == 'f') {
      user.gender = '女'
    } else if (raw.gender == 'm') {
      user.gender = '男'
    }
    user.avatar = raw.avatar_large || raw.avatar_hd
    return user
  },

  formatQQProfile: (raw) => {
    let user = {}
    return user
  },
}
