const express = require('express')
const chalk = require('chalk')
var models = require('../../models')
var Sequelize = models.Sequelize
const router = express.Router()
const Op = Sequelize.Op;

// Define the routes for Location
router.get("/", function(req, res) {
  if (!req.query.search) {
    models.Location.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Location.findAll({
      where: {
        [Op.or]: [{
            streetAddress: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            postalCode: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            city: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            stateProvince: {
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
router.get("/:locationId", function(req, res) {
  if (!req.params.locationId) {
    models.Location.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Location.findById(req.params.locationId).then(function(result) {
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
      "message": "Cannot use http post for updating Location"
    });
  }
  var data = {

    streetAddress: req.body.streetAddress,

    postalCode: req.body.postalCode,

    city: req.body.city,

    stateProvince: req.body.stateProvince

  }
  models.Location.create(data).then(function(result) {
    return res.send(result);
  }).catch(function(error) {
    console.log(chalk.red(error))
    return res.status(400).send(error);
  })

})
router.put('/:locationId', (req, res, next) => {
  if (!req.params.locationId) {
    return res.status(400).send({
      "status": "error",
      "message": "Location ID is required"
    });
  }
  models.Location.findById(req.params.locationId).then(function(location) {
    var data = {}

    if (req.body.hasOwnProperty("streetAddress")) {
      data['streetAddress'] = req.body.streetAddress;
    }

    if (req.body.hasOwnProperty("postalCode")) {
      data['postalCode'] = req.body.postalCode;
    }

    if (req.body.hasOwnProperty("city")) {
      data['city'] = req.body.city;
    }

    if (req.body.hasOwnProperty("stateProvince")) {
      data['stateProvince'] = req.body.stateProvince;
    }

    location.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })



})
router.patch('/:locationId', (req, res, next) => {

  if (!req.params.locationId) {
    return res.status(400).send({
      "status": "error",
      "message": "Location ID is required"
    });
  }
  models.Location.findById(req.params.locationId).then(function(location) {
    var data = {}

    if (req.body.hasOwnProperty("streetAddress")) {
      data['streetAddress'] = req.body.streetAddress;
    }

    if (req.body.hasOwnProperty("postalCode")) {
      data['postalCode'] = req.body.postalCode;
    }

    if (req.body.hasOwnProperty("city")) {
      data['city'] = req.body.city;
    }

    if (req.body.hasOwnProperty("stateProvince")) {
      data['stateProvince'] = req.body.stateProvince;
    }

    location.save(data).then(function(result) {
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