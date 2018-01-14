'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(__filename)
var env = process.env.NODE_ENV || 'development'
var config = require('../config/config')[env]
var db = {}
const Region = require('./region')
const Country = require('./country')
const Location = require('./location')
const Department = require('./department')
const Task = require('./task')
const Employee = require('./employee')
const Job = require('./job')

var sequelize = null

if (config.use_env_variable && process.env[config.use_env_variable]) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}
db['Region'] = Region(sequelize, Sequelize.DataTypes)
db['Country'] = Country(sequelize, Sequelize.DataTypes)
db['Location'] = Location(sequelize, Sequelize.DataTypes)
db['Department'] = Department(sequelize, Sequelize.DataTypes)
db['Task'] = Task(sequelize, Sequelize.DataTypes)
db['Employee'] = Employee(sequelize, Sequelize.DataTypes)
db['Job'] = Job(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db