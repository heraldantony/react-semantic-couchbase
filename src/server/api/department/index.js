const express = require('express')
const chalk = require('chalk')
const db = require('../../db')
const DepartmentModel = require('../../schema/model/department')

const router = express.Router()
const bucket = process.env.BUCKET
const PAGESIZE = 10

// Define the routes for Department
router.get('/', function (req, res) {
	var options = {
		limit: req.query.limit || PAGESIZE,
		skip: req.query.page ? (req.query.page * (req.query.limit || PAGESIZE)) : 0
	}
	if (!req.query.search) {
		DepartmentModel.find({}, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			// res.setHeader('X-Total-Count', meta.status.total);
			return res.send(result)
		})
	} else {
		db.queryEntity('Department', req.query.search, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			res.setHeader('X-Total-Count', meta.status.total)
			var entities = result.map((e) => {
				return DepartmentModel.ref(e.id.substring(e.id.indexOf('|') + 1))
			})
			DepartmentModel.loadAll(entities, () => {
				return res.send(entities)
			})
		})
	}
})
router.get('/:departmentId', function (req, res) {
	if (!req.params.departmentId) {
		DepartmentModel.find({}, function (error, result) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(result)
		})
	} else {
		DepartmentModel.getById(req.params.departmentId, function (error, department) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(department)
		})
	}
})

router.post('/', (req, res, next) => {
	if (req.body.hasOwnProperty('id')) {
		return res.status(400).send({
			'status': 'error',
			'message': 'Cannot use http post for updating Department'
		})
	}
	const {

		departmentName

	} = req.body
	DepartmentModel.createAndSave(
		departmentName,
		(createErr, newDepartment) => {
			if (createErr) {
				console.log(chalk.red(createErr))

				return res.status(400).send({
					'status': 'error',
					'message': createErr
				})
			} else {
				return res.json(newDepartment)
			}
		})
})
router.put('/:departmentId', (req, res, next) => {
	if (!req.params.departmentId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Department ID is required'
		})
	}
	DepartmentModel.getById(req.params.departmentId, {}, function (error, department) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('departmentName')) {
			department.departmentName = req.body.departmentName
		}

		department.save(function (saveError, savedDepartment) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedDepartment)
		})
	})
})
router.patch('/:departmentId', (req, res, next) => {
	if (!req.params.departmentId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Department ID is required'
		})
	}
	DepartmentModel.getById(req.params.departmentId, {}, function (error, department) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('departmentName')) {
			department.departmentName = req.body.departmentName
		}

		department.save(function (saveError, savedDepartment) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedDepartment)
		})
	})
})
module.exports = router
