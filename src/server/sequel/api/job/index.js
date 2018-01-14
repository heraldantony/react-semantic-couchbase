const express = require('express')
const chalk = require('chalk')
var models = require('../../models')
var Sequelize = models.Sequelize
const router = express.Router()
const Op = Sequelize.Op;

// Define the routes for Job
router.get("/", function(req, res) {
  if (!req.query.search) {
    models.Job.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Job.findAll({
      where: {
        [Op.or]: [{
          jobTitle: {
            [Op.like]: '%' + req.query.search + '%'
          }
        }]
      }
    }).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  }
});
router.get("/:jobId", function(req, res) {
  if (!req.params.jobId) {
    models.Job.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Job.findById(req.params.jobId).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  }
});


router.post('/', (req, res, next) => {
  if (req.body.hasOwnProperty("id")) {
    return res.status(400).send({
      "status": "error",
      "message": "Cannot use http post for updating Job"
    });
  }
  var data = {

    jobTitle: req.body.jobTitle,

    minSalary: req.body.minSalary,

    maxSalary: req.body.maxSalary

  }
  models.Job.create(data).then(function(result) {
    return res.send(result);
  }).catch(function(error) {
    console.log(chalk.red(error))
    return res.status(400).send(error);
  })

})
router.put('/:jobId', (req, res, next) => {
  if (!req.params.jobId) {
    return res.status(400).send({
      "status": "error",
      "message": "Job ID is required"
    });
  }
  models.Job.findById(req.params.jobId).then(function(job) {
    var data = {}

    if (req.body.hasOwnProperty("jobTitle")) {
      data['jobTitle'] = req.body.jobTitle;
    }

    if (req.body.hasOwnProperty("minSalary")) {
      data['minSalary'] = req.body.minSalary;
    }

    if (req.body.hasOwnProperty("maxSalary")) {
      data['maxSalary'] = req.body.maxSalary;
    }

    job.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })



})
router.patch('/:jobId', (req, res, next) => {

  if (!req.params.jobId) {
    return res.status(400).send({
      "status": "error",
      "message": "Job ID is required"
    });
  }
  models.Job.findById(req.params.jobId).then(function(job) {
    var data = {}

    if (req.body.hasOwnProperty("jobTitle")) {
      data['jobTitle'] = req.body.jobTitle;
    }

    if (req.body.hasOwnProperty("minSalary")) {
      data['minSalary'] = req.body.minSalary;
    }

    if (req.body.hasOwnProperty("maxSalary")) {
      data['maxSalary'] = req.body.maxSalary;
    }

    job.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })


})
module.exports = router