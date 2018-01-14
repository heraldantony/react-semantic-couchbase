'use strict';
module.exports = (sequelize, DataTypes) => {
  var Region = sequelize.define('Region', {

    regionName: DataTypes.STRING

  });


  return Region;
}