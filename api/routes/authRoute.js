module.exports = {
  'POST /auth/signup': {
    controller: "AuthController",
    action: "signup"
  },
  'POST /auth/login': {
    controller: "AuthController",
    action: "login"
  },

  //QQ authentication
  'GET /auth/qq/callback': {
    controller: "AuthQQController",
    action: "login"
  },

  //QQ authentication
  'GET /auth/weibo/callback': {
    controller: "AuthWeiboController",
    action: "login"
  },

  //github authentication
  'GET /auth/github/callback': {
    controller: "AuthGithubController",
    action: "login"
  },
}
