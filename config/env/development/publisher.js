module.exports.publisher = {
  //control activeness of publisher
  //its active by default
  active: true,

  // default key prefix for kue in
  // redis server
  prefix: 'q',

  //default redis configuration
  redis: {
      //default redis server port
      port: 6379,
      //default redis server host
      host: 'localhost'
  },
  //number of milliseconds
  //to wait
  //before shutdown publisher
  shutdownDelay: 200,

  //job tracker ui port
  ui: {
      port: 3000,
      title: 'Job Tracker'
  }
}
