module.exports = {
  'POST /auth/signup': {
    controller: "AuthController",
    action: "signup"
  },
  'POST /auth/login': {
    controller: "AuthController",
    action: "login"
  },

  //github authentication
  'GET /auth/github/callback': {
    controller: "AuthGithubController",
    action: "login"
  },
}
