'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {

    firstName: DataTypes.STRING,

    lastName: DataTypes.STRING,

    email: DataTypes.STRING,

    phoneNumber: DataTypes.STRING,

    hireDate: DataTypes.DATE,

    salary: DataTypes.INTEGER,

    commissionPct: DataTypes.INTEGER

  });


  Employee.associate = (models) => {


    models.Employee.belongsTo(models.Department, {
      as: 'department'
    });



    models.Employee.hasMany(models.Job, {
      as: 'jobs'
    });



    models.Employee.belongsTo(models.Manager, {
      as: 'manager'
    });


  }

  return Employee;
}