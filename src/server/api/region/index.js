const express = require('express')
const chalk = require('chalk')
const db = require('../../db')
const RegionModel = require('../../schema/model/region')

const router = express.Router()
const bucket = process.env.BUCKET
const PAGESIZE = 10

// Define the routes for Region
router.get('/', function (req, res) {
	var options = {
		limit: req.query.limit || PAGESIZE,
		skip: req.query.page ? (req.query.page * (req.query.limit || PAGESIZE)) : 0
	}
	if (!req.query.search) {
		RegionModel.find({}, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			// res.setHeader('X-Total-Count', meta.status.total);
			return res.send(result)
		})
	} else {
		db.queryEntity('Region', req.query.search, options, function (error, result, meta) {
			if (error) {
				return res.status(400).send(error)
			}
			res.setHeader('X-Total-Count', meta.status.total)
			var entities = result.map((e) => {
				return RegionModel.ref(e.id.substring(e.id.indexOf('|') + 1))
			})
			RegionModel.loadAll(entities, () => {
				return res.send(entities)
			})
		})
	}
})
router.get('/:regionId', function (req, res) {
	if (!req.params.regionId) {
		RegionModel.find({}, function (error, result) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(result)
		})
	} else {
		RegionModel.getById(req.params.regionId, function (error, region) {
			if (error) {
				return res.status(400).send(error)
			}
			return res.send(region)
		})
	}
})

router.post('/', (req, res, next) => {
	if (req.body.hasOwnProperty('id')) {
		return res.status(400).send({
			'status': 'error',
			'message': 'Cannot use http post for updating Region'
		})
	}
	const {

		regionName

	} = req.body
	RegionModel.createAndSave(
		regionName,
		(createErr, newRegion) => {
			if (createErr) {
				console.log(chalk.red(createErr))

				return res.status(400).send({
					'status': 'error',
					'message': createErr
				})
			} else {
				return res.json(newRegion)
			}
		})
})
router.put('/:regionId', (req, res, next) => {
	if (!req.params.regionId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Region ID is required'
		})
	}
	RegionModel.getById(req.params.regionId, {}, function (error, region) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('regionName')) {
			region.regionName = req.body.regionName
		}

		region.save(function (saveError, savedRegion) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedRegion)
		})
	})
})
router.patch('/:regionId', (req, res, next) => {
	if (!req.params.regionId) {
		return res.status(400).send({
			'status': 'error',
			'message': 'A Region ID is required'
		})
	}
	RegionModel.getById(req.params.regionId, {}, function (error, region) {
		if (error) {
			return res.status(400).send(error)
		}

		if (req.body.hasOwnProperty('regionName')) {
			region.regionName = req.body.regionName
		}

		region.save(function (saveError, savedRegion) {
			if (saveError) {
				return res.status(400).send(saveError)
			}
			res.send(savedRegion)
		})
	})
})
module.exports = router
