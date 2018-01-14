const express = require('express')
const chalk = require('chalk')
const db = require('../../db')
const JobModel = require('../../schema/model/job')

const router = express.Router()
const bucket = process.env.BUCKET
const PAGESIZE = 10

// Define the routes for Job
router.get('/', function (req, res) {
	var options = {
		limit: req.query.limit || PAGESIZE,
		skip: req.query.page ? (req.query.page * (req.query.limit || PAGESIZE)) : 0
	}
	if (!req.query.search) {
		JobModel.find({}, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			// res.setHeader('X-Total-Count', meta.status.total);
			return res.send(result)
		})
	} else {
		db.queryEntity('Job', req.query.search, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			res.setHeader('X-Total-Count', meta.status.total)
			var entities = result.map((e) => {
				return JobModel.ref(e.id.substring(e.id.indexOf('|') + 1))
			})
			JobModel.loadAll(entities, () => {
				return res.send(entities)
			})
		})
	}
})
router.get('/:jobId', function (req, res) {
	if (!req.params.jobId) {
		JobModel.find({}, function (error, result) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(result)
		})
	} else {
		JobModel.getById(req.params.jobId, function (error, job) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(job)
		})
	}
})

router.post('/', (req, res, next) => {
	if (req.body.hasOwnProperty('id')) {
		return res.status(400).send({
			'status': 'error',
			'message': 'Cannot use http post for updating Job'
		})
	}
	const {

		jobTitle,

		minSalary,

		maxSalary

	} = req.body
	JobModel.createAndSave(
		jobTitle,

		minSalary,

		maxSalary,
		(createErr, newJob) => {
			if (createErr) {
				console.log(chalk.red(createErr))

				return res.status(400).send({
					'status': 'error',
					'message': createErr
				})
			} else {
				return res.json(newJob)
			}
		})
})
router.put('/:jobId', (req, res, next) => {
	if (!req.params.jobId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Job ID is required'
		})
	}
	JobModel.getById(req.params.jobId, {}, function (error, job) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('jobTitle')) {
			job.jobTitle = req.body.jobTitle
		}

		if (req.body.hasOwnProperty('minSalary')) {
			job.minSalary = req.body.minSalary
		}

		if (req.body.hasOwnProperty('maxSalary')) {
			job.maxSalary = req.body.maxSalary
		}

		job.save(function (saveError, savedJob) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedJob)
		})
	})
})
router.patch('/:jobId', (req, res, next) => {
	if (!req.params.jobId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Job ID is required'
		})
	}
	JobModel.getById(req.params.jobId, {}, function (error, job) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('jobTitle')) {
			job.jobTitle = req.body.jobTitle
		}

		if (req.body.hasOwnProperty('minSalary')) {
			job.minSalary = req.body.minSalary
		}

		if (req.body.hasOwnProperty('maxSalary')) {
			job.maxSalary = req.body.maxSalary
		}

		job.save(function (saveError, savedJob) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedJob)
		})
	})
})
module.exports = router
