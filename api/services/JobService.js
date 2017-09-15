
//setup recurring jobs
var kue = require('kue');
var doRemove = false;
var pub = sails.hooks.publisher;

module.exports = {

  removeAllJobs: () => {
    kue.Job.rangeByState( 'complete', 0, 5000, 'asc', function( err, jobs ) {
      sails.log.debug('cleanup completed job');
      jobs.forEach( function( job ) {
        job.remove( function(){});
      });
    });
    kue.Job.rangeByState( 'delayed', 0, 5000, 'asc', function( err, jobs ) {
      sails.log.debug('cleanup delayed job');
      jobs.forEach( function( job ) {
        job.remove( function(){});
      });
    });
    kue.Job.rangeByState( 'active', 0, 5000, 'asc', function( err, jobs ) {
      sails.log.debug('cleanup active job');
      jobs.forEach( function( job ) {
        job.remove( function(){});
      });
    });
    kue.Job.rangeByState( 'inactive', 0, 5000, 'asc', function( err, jobs ) {
      sails.log.debug('cleanup inactive job');
      jobs.forEach( function( job ) {
        job.remove( function(){});
      });
    });
    kue.Job.rangeByState( 'failed', 0, 5000, 'asc', function( err, jobs ) {
      sails.log.debug('cleanup failed job');
      jobs.forEach( function( job ) {
        job.remove( function(){});
      });
    });
  },

  updateCourseStats: () => {
    var jobName = "CourseStats";
    pub.createJob(jobName, {
      title: 'update course stats',
      name: jobName,
      interval: 24 * 60 * 60 * 1000,
      removeOnComplete: false
    }).save();
  },

  updateProfStats: () => {
    var jobName = "ProfStats";
    pub.createJob(jobName, {
      title: 'update prof stats',
      name: jobName,
      interval: 24 * 60 * 60 * 1000,
      removeOnComplete: false
    }).save();
  }

};
