// @flow
import {
	Router
} from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
import db from 'server/db'

const router: express$Router = Router()
const bucket = process.env.BUCKET

router.post('/', (req: express$Request, res: express$Response) => {
	// NOTE: if user is already logged in, but wants to change language
	// we have to update his JWT token
	const {
		username,
		password,
		rememberme
	} = req.body
	const data = {
		username: username,
		password: password
	}
	const expires = {
		expiresIn: '1d'
	}
	console.log('username,pass=', username, password)
	if (rememberme) {
		expires.expiresIn = '7d'
	}
	db.query('SELECT * FROM `' + bucket + '` WHERE `type`="user" and `username` = $1 AND `password` = $2', [username, password], (err, results) => {
		if (err) {
			// return next(err)
			res.json({
				status: 'failure',
				message: 'Could not query the database, system error.'
			})
		} else if (results.length <= 0) {
			res.json({
				status: 'failure',
				message: 'Invalid credentials'
			})
		} else {
			var row = results[0][bucket]
			jwt.sign({
				username: username
			}, process.env.JWT_SECRET, expires, (jwterr, token) => {
				if (jwterr) {
					// return next(jwterr)
					res.json({
						status: 'failure',
						message: 'Could not create the token, system error.'
					})
				} else {
					console.log(chalk.yellow(`Generated token for user: ${username}`))
					res.json({
						username: username,
						token: token,
						name: row.name
					})
				}
			})
		}
	})
})

export default router
