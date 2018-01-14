const express = require('express')
const chalk = require('chalk')
const db = require('../../db')
const TaskModel = require('../../schema/model/task')

const router = express.Router()
const bucket = process.env.BUCKET
const PAGESIZE = 10

// Define the routes for Task
router.get('/', function (req, res) {
	var options = {
		limit: req.query.limit || PAGESIZE,
		skip: req.query.page ? (req.query.page * (req.query.limit || PAGESIZE)) : 0
	}
	if (!req.query.search) {
		TaskModel.find({}, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			// res.setHeader('X-Total-Count', meta.status.total);
			return res.send(result)
		})
	} else {
		db.queryEntity('Task', req.query.search, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			res.setHeader('X-Total-Count', meta.status.total)
			var entities = result.map((e) => {
				return TaskModel.ref(e.id.substring(e.id.indexOf('|') + 1))
			})
			TaskModel.loadAll(entities, () => {
				return res.send(entities)
			})
		})
	}
})
router.get('/:taskId', function (req, res) {
	if (!req.params.taskId) {
		TaskModel.find({}, function (error, result) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(result)
		})
	} else {
		TaskModel.getById(req.params.taskId, function (error, task) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(task)
		})
	}
})

router.post('/', (req, res, next) => {
	if (req.body.hasOwnProperty('id')) {
		return res.status(400).send({
			'status': 'error',
			'message': 'Cannot use http post for updating Task'
		})
	}
	const {

		title,

		description

	} = req.body
	TaskModel.createAndSave(
		title,

		description,
		(createErr, newTask) => {
			if (createErr) {
				console.log(chalk.red(createErr))

				return res.status(400).send({
					'status': 'error',
					'message': createErr
				})
			} else {
				return res.json(newTask)
			}
		})
})
router.put('/:taskId', (req, res, next) => {
	if (!req.params.taskId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Task ID is required'
		})
	}
	TaskModel.getById(req.params.taskId, {}, function (error, task) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('title')) {
			task.title = req.body.title
		}

		if (req.body.hasOwnProperty('description')) {
			task.description = req.body.description
		}

		task.save(function (saveError, savedTask) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedTask)
		})
	})
})
router.patch('/:taskId', (req, res, next) => {
	if (!req.params.taskId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Task ID is required'
		})
	}
	TaskModel.getById(req.params.taskId, {}, function (error, task) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('title')) {
			task.title = req.body.title
		}

		if (req.body.hasOwnProperty('description')) {
			task.description = req.body.description
		}

		task.save(function (saveError, savedTask) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedTask)
		})
	})
})
module.exports = router
