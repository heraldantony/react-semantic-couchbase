import {
	Router
} from 'express'
import auth from './auth'
import links from './links.json'
import signup from './signup'

import region from './region'

import country from './country'

import location from './location'

import department from './department'

import task from './task'

import employee from './employee'

import job from './job'

const router = Router()

router.use('/auth', auth)
router.use('/signup', signup)
router.get('/links', (req, res) => {
	res.send(links)
})

router.use('/region', region)

router.use('/country', country)

router.use('/location', location)

router.use('/department', department)

router.use('/task', task)

router.use('/employee', employee)

router.use('/job', job)

export default router
