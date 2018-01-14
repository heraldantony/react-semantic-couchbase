const express = require('express')
const chalk = require('chalk')
var models = require('../../models')
var Sequelize = models.Sequelize
const router = express.Router()
const Op = Sequelize.Op;

// Define the routes for Region
router.get("/", function(req, res) {
  if (!req.query.search) {
    models.Region.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Region.findAll({
      where: {
        [Op.or]: [{
          regionName: {
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
router.get("/:regionId", function(req, res) {
  if (!req.params.regionId) {
    models.Region.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Region.findById(req.params.regionId).then(function(result) {
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
      "message": "Cannot use http post for updating Region"
    });
  }
  var data = {

    regionName: req.body.regionName

  }
  models.Region.create(data).then(function(result) {
    return res.send(result);
  }).catch(function(error) {
    console.log(chalk.red(error))
    return res.status(400).send(error);
  })

})
router.put('/:regionId', (req, res, next) => {
  if (!req.params.regionId) {
    return res.status(400).send({
      "status": "error",
      "message": "Region ID is required"
    });
  }
  models.Region.findById(req.params.regionId).then(function(region) {
    var data = {}

    if (req.body.hasOwnProperty("regionName")) {
      data['regionName'] = req.body.regionName;
    }

    region.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })



})
router.patch('/:regionId', (req, res, next) => {

  if (!req.params.regionId) {
    return res.status(400).send({
      "status": "error",
      "message": "Region ID is required"
    });
  }
  models.Region.findById(req.params.regionId).then(function(region) {
    var data = {}

    if (req.body.hasOwnProperty("regionName")) {
      data['regionName'] = req.body.regionName;
    }

    region.save(data).then(function(result) {
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