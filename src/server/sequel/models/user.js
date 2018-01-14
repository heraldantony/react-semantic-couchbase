'use strict';
var Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING
  });

  return User;
};