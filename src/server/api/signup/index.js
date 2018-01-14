const express = require('express')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const db = require('../../db')
const router = express.Router()
const bucket = process.env.BUCKET

// Define the home page route
router.post('/', (req, res, next) => {
	const {
		username,
		email,
		password
	} = req.body
	const data = {
		username: username,
		email: email,
		password: password
	}
	db.query('SELECT * FROM `' + bucket + '` WHERE `type`="user" and `username` = $1 ', [username], (err, results) => {
		if (err) {
			// return next(err)
			res.json({
				status: 'failure',
				message: 'Could not query the database, system error.'
			})
		} else if (results.length >= 1) {
			res.json({
				status: 'failure',
				message: 'User with this username is already registered.'
			})
		} else {
			db.query('SELECT UUID() ', [], (err, results) => {
				if (err) {
					// return next(err)
					res.json({
						status: 'failure',
						message: 'Could not query the database, system error.'
					})
				} else {
					console.log(results)
					var key = results[0]['$1']
					var docKey = 'user_' + key
					var doc = {
						id: key,
						type: 'user',
						username: username,
						email: email,
						password: password
					}
					db.insertDocument(docKey, doc, (err, results) => {
						if (err) {
							// return next(err)
							res.json({
								status: 'failure',
								message: 'Could not query the database, system error.'
							})
						} else {
							res.json({
								email: email,
								username: username
							})
						}
					})
				}
			})
		}
	})
})

module.exports = router
