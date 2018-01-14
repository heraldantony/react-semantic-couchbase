const express = require('express')
const chalk = require('chalk')
var models = require('../../models')
var Sequelize = models.Sequelize
const router = express.Router()
const Op = Sequelize.Op;

// Define the routes for Department
router.get("/", function(req, res) {
  if (!req.query.search) {
    models.Department.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Department.findAll({
      where: {
        [Op.or]: [{
          departmentName: {
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
router.get("/:departmentId", function(req, res) {
  if (!req.params.departmentId) {
    models.Department.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Department.findById(req.params.departmentId).then(function(result) {
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
      "message": "Cannot use http post for updating Department"
    });
  }
  var data = {

    departmentName: req.body.departmentName

  }
  models.Department.create(data).then(function(result) {
    return res.send(result);
  }).catch(function(error) {
    console.log(chalk.red(error))
    return res.status(400).send(error);
  })

})
router.put('/:departmentId', (req, res, next) => {
  if (!req.params.departmentId) {
    return res.status(400).send({
      "status": "error",
      "message": "Department ID is required"
    });
  }
  models.Department.findById(req.params.departmentId).then(function(department) {
    var data = {}

    if (req.body.hasOwnProperty("departmentName")) {
      data['departmentName'] = req.body.departmentName;
    }

    department.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })



})
router.patch('/:departmentId', (req, res, next) => {

  if (!req.params.departmentId) {
    return res.status(400).send({
      "status": "error",
      "message": "Department ID is required"
    });
  }
  models.Department.findById(req.params.departmentId).then(function(department) {
    var data = {}

    if (req.body.hasOwnProperty("departmentName")) {
      data['departmentName'] = req.body.departmentName;
    }

    department.save(data).then(function(result) {
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