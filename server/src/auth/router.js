import express from 'express'
import { googleLogin, facebookLogin, login, logout } from './service'
import log from '../lib/logger'

import { AuthError } from '../lib/errors'
import { UNAUTHORIZED, UNAUTHORIZED_REQUEST } from '../lib/codes'

const router = express.Router()

/**
 * Mockup function to test user login
 */
router.post('/login', async (req, res) => {
	const user = req.body

	try {
		const data = await login(user)
		return res.status(200).json(data)
	} catch (err) {
		log.error(`testing login failure, err=${err}`)
		return res.status(500).json(err)
	}
})

/**
 * query google userinfo api to get user data
 */
router.get('/google/login/:token', async (req, res) => {
	const token = req.params.token
	try {
		const data = await googleLogin(token)
		return res.status(200).json(data)
	} catch (err) {
		log.error(`google login failure, err=${err}`)
		return res.status(500).json(err)
	}
})

router.get('/facebook/login/:code', async (req, res) => {
	const code = req.params.code
	try {
		const data = await facebookLogin(code)
		return res.status(200).json(data)
	} catch (err) {
		log.error(`facebook login failed, err=${err}`)
		return res.status(500).json(err)
	}
})

router.get('/logout', async (req, res) => {
	const user = req.user
	try {
		const data = await logout(user)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(err.httpStatus).json(err)
	}
})

export default router
