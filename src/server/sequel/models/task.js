'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {

    title: DataTypes.STRING,

    description: DataTypes.STRING

  });


  Task.associate = (models) => {


    models.Task.hasMany(models.Job, {
      as: 'jobs'
    });


  }

  return Task;
}