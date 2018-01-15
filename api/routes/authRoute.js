module.exports = {
  'POST /auth/signup': {
    controller: "AuthLocalController",
    action: "signup"
  },
  'POST /auth/login': {
    controller: "AuthLocalController",
    action: "login"
  },

  // JWT token blacklist
  'POST /auth/blacklists/tokens': {
    controller: "AuthLocalController",
    action: "blacklistToken"
  },

  //QQ authentication
  'GET /auth/qq/callback': {
    controller: "AuthQQController",
    action: "login"
  },

  //weibo authentication
  'GET /auth/weibo/callback': {
    controller: "AuthWeiboController",
    action: "login"
  },
}
