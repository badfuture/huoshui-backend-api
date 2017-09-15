module.exports = {
  //seed leancloud data
  'PUT /seeddb': {
    controller: "SeedController",
    action: "seedDB"
  },

  //check review duplicate
  'GET /checkReviewDuplicate': {
    controller: "DataValidateController",
    action: "checkReviewDuplicate"
  },

  //seed Email
  'POST /sendEmail': {
    controller: "EmailController",
    action: "testEmail"
  }
};
