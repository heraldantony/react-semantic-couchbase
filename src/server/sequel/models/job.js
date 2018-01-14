'use strict';
module.exports = (sequelize, DataTypes) => {
  var Job = sequelize.define('Job', {

    jobTitle: DataTypes.STRING,

    minSalary: DataTypes.INTEGER,

    maxSalary: DataTypes.INTEGER

  });


  Job.associate = (models) => {


    models.Job.belongsTo(models.Employee, {
      as: 'employee'
    });



    models.Job.hasMany(models.Task, {
      as: 'tasks'
    });


  }

  return Job;
}