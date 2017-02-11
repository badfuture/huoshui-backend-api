module.exports = {
  //seed leancloud data
  'PUT /seeddb': {
    controller: "SeedController",
    action: "seedDB"
  },

  //seed Email
  'POST /sendEmail': {
    controller: "EmailController",
    action: "testEmail"
  }
};
