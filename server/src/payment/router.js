import express from 'express'
import { decodeJwt } from '~/src/lib/utils'
import {
	pay,
	stripePubKey,
	getAddress,
	saveAddress,
	updateAddress,
	intentSecret,
} from './service'

import log from '~/src/lib/logger'
const router = express.Router()

/**
 * get current user's shipping/billing address
 */
router.get('/addresses/:type', async (req, res) => {
	const type = req.params.type
	try {
		const user = decodeJwt(req)
		const data = await getAddress(user.id, type)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

/**
 * save a user's address
 */
router.post('/addresses', async (req, res) => {
	const address = req.body
	try {
		const user = decodeJwt(req)
		const data = await saveAddress(user.id, address)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

/**
 * update a user's address
 */
router.put('/addresses/:id', async (req, res) => {
	const id = req.params.id
	const address = req.body
	try {
		const user = decodeJwt(req)
		const data = await updateAddress(user.id, id, address)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.post('/charge', async (req, res) => {
	try {
		const data = await pay(req.body)
		return res.status(200).json(data)
	} catch (err) {
		log.error('failed to pay, err=', err)
		return res.status(500).json(err)
	}
})

router.get('/key', (req, res) => {
	return res.status(200).json(stripePubKey())
})

/**
 * create a payment intent object, return client secret
 * 
 * refer: https://stripe.com/docs/payments/accept-a-payment
 * 
 * sample payload 
 * {
  amount: 1099,
  currency: 'cad',
  metadata: {integration_check: 'accept_a_payment'},
}
 */
router.get('/intent/secret', async (req, res) => {
	const payment = req.body
	const result = await intentSecret(payment)
	return res.status(200).json(result)
})

export default router
