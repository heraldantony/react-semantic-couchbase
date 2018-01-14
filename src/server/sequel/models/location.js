'use strict';
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {

    streetAddress: DataTypes.STRING,

    postalCode: DataTypes.STRING,

    city: DataTypes.STRING,

    stateProvince: DataTypes.STRING

  });


  Location.associate = (models) => {


    models.Location.hasOne(models.Country, {
      as: 'country'
    });


  }

  return Location;
}