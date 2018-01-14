var ottoman = require('ottoman')

var EmployeeModel = ottoman.model('Employee', {

  firstName: 'string',

  lastName: 'string',

  email: 'string',

  phoneNumber: 'string',

  hireDate: 'Date',

  salary: 'integer',

  commissionPct: 'integer',






  jobs: [{
      ref: 'Job'
    }]

    ,







}, {
  index: {





    findByJob: {
      by: 'job'
    }

    ,





  }
})

EmployeeModel.createAndSave = function(
  firstName,

  lastName,

  email,

  phoneNumber,

  hireDate,

  salary,

  commissionPct,
  done) {

  this.create({

    firstName,

    lastName,

    email,

    phoneNumber,

    hireDate,

    salary,

    commissionPct,

  }, done)

}



EmployeeModel.prototype.setFirstName = function(firstName, done) {
  this.firstName = firstName
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

EmployeeModel.prototype.setLastName = function(lastName, done) {
  this.lastName = lastName
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

EmployeeModel.prototype.setEmail = function(email, done) {
  this.email = email
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

EmployeeModel.prototype.setPhoneNumber = function(phoneNumber, done) {
  this.phoneNumber = phoneNumber
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

EmployeeModel.prototype.setHireDate = function(hireDate, done) {
  this.hireDate = hireDate
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

EmployeeModel.prototype.setSalary = function(salary, done) {
  this.salary = salary
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}

EmployeeModel.prototype.setCommissionPct = function(commissionPct, done) {
  this.commissionPct = commissionPct
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}














EmployeeModel.prototype.addJob = function(job, done) {
  if (!this.jobs) {
    this.jobs = []
  }
  this.jobs.push(job)
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}







module.exports = EmployeeModel