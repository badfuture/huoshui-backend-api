module.exports = {
  //seed leancloud data
  'PUT /seeddb': {
    controller: "SeedController",
    action: "seedDB"
  },

  'PUT /cleandb': {
    controller: "SeedController",
    action: "cleanDB"
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
