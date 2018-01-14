const express = require('express')
const chalk = require('chalk')
const db = require('../../db')
const LocationModel = require('../../schema/model/location')

const router = express.Router()
const bucket = process.env.BUCKET
const PAGESIZE = 10


// Define the routes for Location
router.get("/", function(req, res) {
  var options = {
    limit: req.query.limit || PAGESIZE,
    skip: req.query.page ? (req.query.page * (req.query.limit || PAGESIZE)) : 0
  }
  if (!req.query.search) {
    LocationModel.find({}, options, function(error, result, meta) {
      if (error) {
        return res.status(400).send(error);
      }
      //res.setHeader('X-Total-Count', meta.status.total);
      return res.send(result);
    });
  } else {
    db.queryEntity('Location', req.query.search, options, function(error, result, meta) {
      if (error) {
        return res.status(400).send(error);
      }
      res.setHeader('X-Total-Count', meta.status.total);
      var entities = result.map((e) => {
        return LocationModel.ref(e.id.substring(e.id.indexOf("|") + 1))
      })
      LocationModel.loadAll(entities, () => {
        return res.send(entities);
      });
    });
  }
});
router.get("/:locationId", function(req, res) {
  if (!req.params.locationId) {
    LocationModel.find({}, function(error, result) {
      if (error) {
        return res.status(400).send(error);
      }
      return res.send(result);
    });
  } else {
    LocationModel.getById(req.params.locationId, function(error, location) {
      if (error) {
        return res.status(400).send(error);
      }
      return res.send(location);
    });
  }
});


router.post('/', (req, res, next) => {
  if (req.body.hasOwnProperty("id")) {
    return res.status(400).send({
      "status": "error",
      "message": "Cannot use http post for updating Location"
    });
  }
  const {

    streetAddress,

    postalCode,

    city,

    stateProvince

  } = req.body
  LocationModel.createAndSave(
    streetAddress,

    postalCode,

    city,

    stateProvince,
    (createErr, newLocation) => {
      if (createErr) {
        console.log(chalk.red(createErr))

        return res.status(400).send({
          "status": "error",
          "message": createErr
        });


      } else {
        return res.json(newLocation);

      }
    })

})
router.put('/:locationId', (req, res, next) => {
  if (!req.params.locationId) {
    return res.status(400).send({
      "status": "error",
      "message": "A Location ID is required"
    });
  }
  LocationModel.getById(req.params.locationId, {}, function(error, location) {
    if (error) {
      return res.status(400).send(error);
    }



    if (req.body.hasOwnProperty("streetAddress")) {
      location.streetAddress = req.body.streetAddress
    }

    if (req.body.hasOwnProperty("postalCode")) {
      location.postalCode = req.body.postalCode
    }

    if (req.body.hasOwnProperty("city")) {
      location.city = req.body.city
    }

    if (req.body.hasOwnProperty("stateProvince")) {
      location.stateProvince = req.body.stateProvince
    }



    location.save(function(saveError, savedLocation) {
      if (saveError) {
        return res.status(400).send(saveError);
      }
      res.send(savedLocation);
    });


  });


})
router.patch('/:locationId', (req, res, next) => {
  if (!req.params.locationId) {
    return res.status(400).send({
      "status": "error",
      "message": "A Location ID is required"
    });
  }
  LocationModel.getById(req.params.locationId, {}, function(error, location) {
    if (error) {
      return res.status(400).send(error);
    }



    if (req.body.hasOwnProperty("streetAddress")) {
      location.streetAddress = req.body.streetAddress
    }

    if (req.body.hasOwnProperty("postalCode")) {
      location.postalCode = req.body.postalCode
    }

    if (req.body.hasOwnProperty("city")) {
      location.city = req.body.city
    }

    if (req.body.hasOwnProperty("stateProvince")) {
      location.stateProvince = req.body.stateProvince
    }



    location.save(function(saveError, savedLocation) {
      if (saveError) {
        return res.status(400).send(saveError);
      }
      res.send(savedLocation);
    });


  });


})
module.exports = router