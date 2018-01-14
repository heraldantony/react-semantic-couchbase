var ottoman = require('ottoman')

var JobModel = ottoman.model('Job', {

  jobTitle: 'string',

  minSalary: 'integer',

  maxSalary: 'integer',






  tasks: [{
    ref: 'Task'
  }]






}, {
  index: {





    findByTask: {
      by: 'task'
    }




  }
})

JobModel.createAndSave = function(
  jobTitle,

  minSalary,

  maxSalary,
  done) {

  this.create({

    jobTitle,

    minSalary,

    maxSalary,

  }, done)

}



JobModel.prototype.setJobTitle = function(jobTitle, done) {
  this.jobTitle = jobTitle
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

JobModel.prototype.setMinSalary = function(minSalary, done) {
  this.minSalary = minSalary
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

JobModel.prototype.setMaxSalary = function(maxSalary, done) {
  this.maxSalary = maxSalary
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}












JobModel.prototype.addTask = function(task, done) {
  if (!this.tasks) {
    this.tasks = []
  }
  this.tasks.push(task)
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}




module.exports = JobModel