const express = require('express')
const chalk = require('chalk')
var models = require('../../models')
var Sequelize = models.Sequelize
const router = express.Router()
const Op = Sequelize.Op;

// Define the routes for Employee
router.get("/", function(req, res) {
  if (!req.query.search) {
    models.Employee.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Employee.findAll({
      where: {
        [Op.or]: [{
            firstName: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            lastName: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            email: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            phoneNumber: {
              [Op.like]: '%' + req.query.search + '%'
            }
          }
        ]
      }
    }).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  }
});
router.get("/:employeeId", function(req, res) {
  if (!req.params.employeeId) {
    models.Employee.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Employee.findById(req.params.employeeId).then(function(result) {
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
      "message": "Cannot use http post for updating Employee"
    });
  }
  var data = {

    firstName: req.body.firstName,

    lastName: req.body.lastName,

    email: req.body.email,

    phoneNumber: req.body.phoneNumber,

    hireDate: req.body.hireDate,

    salary: req.body.salary,

    commissionPct: req.body.commissionPct

  }
  models.Employee.create(data).then(function(result) {
    return res.send(result);
  }).catch(function(error) {
    console.log(chalk.red(error))
    return res.status(400).send(error);
  })

})
router.put('/:employeeId', (req, res, next) => {
  if (!req.params.employeeId) {
    return res.status(400).send({
      "status": "error",
      "message": "Employee ID is required"
    });
  }
  models.Employee.findById(req.params.employeeId).then(function(employee) {
    var data = {}

    if (req.body.hasOwnProperty("firstName")) {
      data['firstName'] = req.body.firstName;
    }

    if (req.body.hasOwnProperty("lastName")) {
      data['lastName'] = req.body.lastName;
    }

    if (req.body.hasOwnProperty("email")) {
      data['email'] = req.body.email;
    }

    if (req.body.hasOwnProperty("phoneNumber")) {
      data['phoneNumber'] = req.body.phoneNumber;
    }

    if (req.body.hasOwnProperty("hireDate")) {
      data['hireDate'] = req.body.hireDate;
    }

    if (req.body.hasOwnProperty("salary")) {
      data['salary'] = req.body.salary;
    }

    if (req.body.hasOwnProperty("commissionPct")) {
      data['commissionPct'] = req.body.commissionPct;
    }

    employee.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })



})
router.patch('/:employeeId', (req, res, next) => {

  if (!req.params.employeeId) {
    return res.status(400).send({
      "status": "error",
      "message": "Employee ID is required"
    });
  }
  models.Employee.findById(req.params.employeeId).then(function(employee) {
    var data = {}

    if (req.body.hasOwnProperty("firstName")) {
      data['firstName'] = req.body.firstName;
    }

    if (req.body.hasOwnProperty("lastName")) {
      data['lastName'] = req.body.lastName;
    }

    if (req.body.hasOwnProperty("email")) {
      data['email'] = req.body.email;
    }

    if (req.body.hasOwnProperty("phoneNumber")) {
      data['phoneNumber'] = req.body.phoneNumber;
    }

    if (req.body.hasOwnProperty("hireDate")) {
      data['hireDate'] = req.body.hireDate;
    }

    if (req.body.hasOwnProperty("salary")) {
      data['salary'] = req.body.salary;
    }

    if (req.body.hasOwnProperty("commissionPct")) {
      data['commissionPct'] = req.body.commissionPct;
    }

    employee.save(data).then(function(result) {
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