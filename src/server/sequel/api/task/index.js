const express = require('express')
const chalk = require('chalk')
var models = require('../../models')
var Sequelize = models.Sequelize
const router = express.Router()
const Op = Sequelize.Op;

// Define the routes for Task
router.get("/", function(req, res) {
  if (!req.query.search) {
    models.Task.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Task.findAll({
      where: {
        [Op.or]: [{
            title: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            description: {
              [Op.like]: '%' + req.query.search + '%'
            }
          }
        ]
      }
    }).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  }
});
router.get("/:taskId", function(req, res) {
  if (!req.params.taskId) {
    models.Task.findAll({}).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  } else {
    models.Task.findById(req.params.taskId).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return res.status(400).send(error);
    })
  }
});


router.post('/', (req, res, next) => {
  if (req.body.hasOwnProperty("id")) {
    return res.status(400).send({
      "status": "error",
      "message": "Cannot use http post for updating Task"
    });
  }
  var data = {

    title: req.body.title,

    description: req.body.description

  }
  models.Task.create(data).then(function(result) {
    return res.send(result);
  }).catch(function(error) {
    console.log(chalk.red(error))
    return res.status(400).send(error);
  })

})
router.put('/:taskId', (req, res, next) => {
  if (!req.params.taskId) {
    return res.status(400).send({
      "status": "error",
      "message": "Task ID is required"
    });
  }
  models.Task.findById(req.params.taskId).then(function(task) {
    var data = {}

    if (req.body.hasOwnProperty("title")) {
      data['title'] = req.body.title;
    }

    if (req.body.hasOwnProperty("description")) {
      data['description'] = req.body.description;
    }

    task.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })



})
router.patch('/:taskId', (req, res, next) => {

  if (!req.params.taskId) {
    return res.status(400).send({
      "status": "error",
      "message": "Task ID is required"
    });
  }
  models.Task.findById(req.params.taskId).then(function(task) {
    var data = {}

    if (req.body.hasOwnProperty("title")) {
      data['title'] = req.body.title;
    }

    if (req.body.hasOwnProperty("description")) {
      data['description'] = req.body.description;
    }

    task.save(data).then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      console.log(chalk.red(error))
      return res.status(400).send(error);
    })
  }).catch(function(error) {
    return res.status(400).send(error);
  })


})
module.exports = router