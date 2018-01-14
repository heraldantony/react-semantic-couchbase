// @flow
import {
  Router
} from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
var models = require('../../models')

const router: express$Router = Router()

router.post('/', (req: express$Request, res: express$Response) => {
  // NOTE: if user is already logged in, but wants to change language
  // we have to update his JWT token
  const {
    username,
    password,
    rememberme
  } = req.body
  const data = {
    username: username,
    password: password
  }
  const expires = {
    expiresIn: '1d'
  }
  console.log('username,pass=', username, password)
  if (rememberme) {
    expires.expiresIn = '7d'
  }
  models.User.findAll({
    where: {
      username: username,
      password: password
    }
  }).then(function(results) {
    if (results.length <= 0) {
      res.json({
        status: 'failure',
        message: 'Invalid credentials'
      })
    } else {
      var user = results[0]
      jwt.sign({
        username: username
      }, process.env.JWT_SECRET, expires, (jwterr, token) => {
        if (jwterr) {
          // return next(jwterr)
          res.json({
            status: 'failure',
            message: 'Could not create the token, system error.'
          })
        } else {
          console.log(chalk.yellow(`Generated token for user: ${username}`))
          res.json({
            username: username,
            token: token,
            name: user.name
          })
        }
      })
    }
  }).catch(function(err) {
    res.json({
      status: 'failure',
      message: err
    })
  })
})

export default router