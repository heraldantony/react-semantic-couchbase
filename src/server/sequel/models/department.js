'use strict';
module.exports = (sequelize, DataTypes) => {
  var Department = sequelize.define('Department', {

    departmentName: DataTypes.STRING

  });


  Department.associate = (models) => {


    models.Department.hasOne(models.Location, {
      as: 'location'
    });



    models.Department.hasMany(models.Employee, {
      as: 'employees'
    });


  }

  return Department;
}