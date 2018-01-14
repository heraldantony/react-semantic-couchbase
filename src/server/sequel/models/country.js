'use strict';
module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define('Country', {

    countryName: DataTypes.STRING

  });


  Country.associate = (models) => {


    models.Country.hasOne(models.Region, {
      as: 'region'
    });


  }

  return Country;
}