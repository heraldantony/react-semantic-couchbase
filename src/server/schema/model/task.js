var ottoman = require('ottoman')

var TaskModel = ottoman.model('Task', {

  title: 'string',

  description: 'string',



  jobs: [{
    ref: 'Job'
  }]






}, {
  index: {


    findByJob: {
      by: 'job'
    }




  }
})

TaskModel.createAndSave = function(
  title,

  description,
  done) {

  this.create({

    title,

    description,

  }, done)

}



TaskModel.prototype.setTitle = function(title, done) {
  this.title = title
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

TaskModel.prototype.setDescription = function(description, done) {
  this.description = description
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}







TaskModel.prototype.addJob = function(job, done) {
  if (!this.jobs) {
    this.jobs = []
  }
  this.jobs.push(job)
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}




module.exports = TaskModel