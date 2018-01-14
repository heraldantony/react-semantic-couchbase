const express = require('express')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const router = express.Router()
var models = require('../../models')

// Define the home page route
router.post('/', (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body
  const data = {
    username: username,
    email: email,
    password: password
  }
  models.User.findAll({
    where: {
      username: username
    }
  }).then(function(results) {
    if (results.length >= 1) {
      return res.json({
        status: 'failure',
        message: 'User with this username is already registered.'
      })
    }
    var data = {
      username: username,
      email: email,
      password: password
    }
    models.User.create(data).then(function(result) {
      return res.send({
        username: username,
        email: email
      });
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })

  }).catch(function(err) {
    console.log(chalk.red(err))
    // return next(err)
    res.json({
      status: 'failure',
      message: 'Could not query the database, system error.'
    })
  })

})

module.exports = router