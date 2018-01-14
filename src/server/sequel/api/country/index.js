const express = require('express')
const chalk = require('chalk')
var models = require('../../models')
var Sequelize = models.Sequelize
const router = express.Router()
const Op = Sequelize.Op;

// Define the routes for Country
router.get("/", function(req, res) {
  if (!req.query.search) {
    models.Country.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Country.findAll({
      where: {
        [Op.or]: [{
          countryName: {
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
router.get("/:countryId", function(req, res) {
  if (!req.params.countryId) {
    models.Country.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Country.findById(req.params.countryId).then(function(result) {
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
      "message": "Cannot use http post for updating Country"
    });
  }
  var data = {

    countryName: req.body.countryName

  }
  models.Country.create(data).then(function(result) {
    return res.send(result);
  }).catch(function(error) {
    console.log(chalk.red(error))
    return res.status(400).send(error);
  })

})
router.put('/:countryId', (req, res, next) => {
  if (!req.params.countryId) {
    return res.status(400).send({
      "status": "error",
      "message": "Country ID is required"
    });
  }
  models.Country.findById(req.params.countryId).then(function(country) {
    var data = {}

    if (req.body.hasOwnProperty("countryName")) {
      data['countryName'] = req.body.countryName;
    }

    country.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })



})
router.patch('/:countryId', (req, res, next) => {

  if (!req.params.countryId) {
    return res.status(400).send({
      "status": "error",
      "message": "Country ID is required"
    });
  }
  models.Country.findById(req.params.countryId).then(function(country) {
    var data = {}

    if (req.body.hasOwnProperty("countryName")) {
      data['countryName'] = req.body.countryName;
    }

    country.save(data).then(function(result) {
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