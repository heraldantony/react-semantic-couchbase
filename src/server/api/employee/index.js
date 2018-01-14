const express = require('express')
const chalk = require('chalk')
const db = require('../../db')
const EmployeeModel = require('../../schema/model/employee')

const router = express.Router()
const bucket = process.env.BUCKET
const PAGESIZE = 10


// Define the routes for Employee
router.get("/", function(req, res) {
  var options = {
    limit: req.query.limit || PAGESIZE,
    skip: req.query.page ? (req.query.page * (req.query.limit || PAGESIZE)) : 0
  }
  if (!req.query.search) {
    EmployeeModel.find({}, options, function(error, result, meta) {
      if (error) {
        return res.status(400).send(error);
      }
      //res.setHeader('X-Total-Count', meta.status.total);
      return res.send(result);
    });
  } else {
    db.queryEntity('Employee', req.query.search, options, function(error, result, meta) {
      if (error) {
        return res.status(400).send(error);
      }
      res.setHeader('X-Total-Count', meta.status.total);
      var entities = result.map((e) => {
        return EmployeeModel.ref(e.id.substring(e.id.indexOf("|") + 1))
      })
      EmployeeModel.loadAll(entities, () => {
        return res.send(entities);
      });
    });
  }
});
router.get("/:employeeId", function(req, res) {
  if (!req.params.employeeId) {
    EmployeeModel.find({}, function(error, result) {
      if (error) {
        return res.status(400).send(error);
      }
      return res.send(result);
    });
  } else {
    EmployeeModel.getById(req.params.employeeId, function(error, employee) {
      if (error) {
        return res.status(400).send(error);
      }
      return res.send(employee);
    });
  }
});


router.post('/', (req, res, next) => {
  if (req.body.hasOwnProperty("id")) {
    return res.status(400).send({
      "status": "error",
      "message": "Cannot use http post for updating Employee"
    });
  }
  const {

    firstName,

    lastName,

    email,

    phoneNumber,

    hireDate,

    salary,

    commissionPct

  } = req.body
  EmployeeModel.createAndSave(
    firstName,

    lastName,

    email,

    phoneNumber,

    hireDate,

    salary,

    commissionPct,
    (createErr, newEmployee) => {
      if (createErr) {
        console.log(chalk.red(createErr))

        return res.status(400).send({
          "status": "error",
          "message": createErr
        });


      } else {
        return res.json(newEmployee);

      }
    })

})
router.put('/:employeeId', (req, res, next) => {
  if (!req.params.employeeId) {
    return res.status(400).send({
      "status": "error",
      "message": "A Employee ID is required"
    });
  }
  EmployeeModel.getById(req.params.employeeId, {}, function(error, employee) {
    if (error) {
      return res.status(400).send(error);
    }



    if (req.body.hasOwnProperty("firstName")) {
      employee.firstName = req.body.firstName
    }

    if (req.body.hasOwnProperty("lastName")) {
      employee.lastName = req.body.lastName
    }

    if (req.body.hasOwnProperty("email")) {
      employee.email = req.body.email
    }

    if (req.body.hasOwnProperty("phoneNumber")) {
      employee.phoneNumber = req.body.phoneNumber
    }

    if (req.body.hasOwnProperty("hireDate")) {
      employee.hireDate = req.body.hireDate
    }

    if (req.body.hasOwnProperty("salary")) {
      employee.salary = req.body.salary
    }

    if (req.body.hasOwnProperty("commissionPct")) {
      employee.commissionPct = req.body.commissionPct
    }



    employee.save(function(saveError, savedEmployee) {
      if (saveError) {
        return res.status(400).send(saveError);
      }
      res.send(savedEmployee);
    });


  });


})
router.patch('/:employeeId', (req, res, next) => {
  if (!req.params.employeeId) {
    return res.status(400).send({
      "status": "error",
      "message": "A Employee ID is required"
    });
  }
  EmployeeModel.getById(req.params.employeeId, {}, function(error, employee) {
    if (error) {
      return res.status(400).send(error);
    }



    if (req.body.hasOwnProperty("firstName")) {
      employee.firstName = req.body.firstName
    }

    if (req.body.hasOwnProperty("lastName")) {
      employee.lastName = req.body.lastName
    }

    if (req.body.hasOwnProperty("email")) {
      employee.email = req.body.email
    }

    if (req.body.hasOwnProperty("phoneNumber")) {
      employee.phoneNumber = req.body.phoneNumber
    }

    if (req.body.hasOwnProperty("hireDate")) {
      employee.hireDate = req.body.hireDate
    }

    if (req.body.hasOwnProperty("salary")) {
      employee.salary = req.body.salary
    }

    if (req.body.hasOwnProperty("commissionPct")) {
      employee.commissionPct = req.body.commissionPct
    }



    employee.save(function(saveError, savedEmployee) {
      if (saveError) {
        return res.status(400).send(saveError);
      }
      res.send(savedEmployee);
    });


  });


})
module.exports = router