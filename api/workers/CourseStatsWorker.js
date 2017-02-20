var pub = sails.hooks.publisher;
var jobName = "coursestats";

module.exports = {
    concurrency: 1,
    perform: (job, context, done) => {
      var data = job.data;
      var id = job.id;
      var jobName = data.name;
      var title = data.title;
      var interval = data.interval;
      var doRemove = data.removeOnComplete;
      var executeTime = 5000;
      sails.log.debug("processing job: " + id + " | name: " + jobName);

      setTimeout(function () {}, executeTime);
      job.progress(1,2);
      setTimeout(function () {

          //schedule next job
          pub.createJob(jobName, {
              title: title,
              name: jobName,
              interval: interval,
              removeOnComplete: doRemove
          }).delay(interval).removeOnComplete(doRemove).save();


          done();

      }, executeTime);
    }
};
