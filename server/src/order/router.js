import express from 'express'
import log from '../lib/logger'
import { setQuantity, removeItems, addItems, getCart } from '../order/service'

const router = express.Router()

//////////////////////////////////////
//  cart apis
//////////////////////////////////////

/**
 * add purchase items, return cart
 * req.body=[{sku,quantity}]
 */
router.post('/cart', async (req, res) => {
	// items = [
	// 		{ sku: product.sku, quantity: values.amount },
	// 	]
	log.error(`add item to cart, req.body=${JSON.stringify(req.body)}`)
	const items = req.body

	try {
		const user = req.user
		const data = await addItems(user.id, items)
		return res.status(200).json(data)
	} catch (err) {
		log.error(`addItems, error=${JSON.stringify(err)}`)
		return res.status(500).json(err)
	}
})

/**
 * update purchase item quantity, return write result
 * req = {quantity:int}
 */
router.put('/cart/:sku', async (req, res) => {
	const sku = req.params.sku
	const quantity = req.body.quantity
	const user = req.user

	try {
		const cart = await setQuantity(user.id, sku, quantity)
		return res.status(200).json(cart)
	} catch (err) {
		log.error(`setQuantity, error=${JSON.stringify(err)}`)
		return res.status(500).json(err)
	}
})

/**
 * remove purchase items from cart, return write result
 */
router.post('/cart/delete', async (req, res) => {
	const skus = req.body
	const user = req.user
	try {
		const cart = await removeItems(user.id, skus)
		return res.status(200).json(cart)
	} catch (err) {
		log.error(`removeItems, error=${JSON.stringify(err)}`)
		return res.status(500).json(err)
	}
})

/**
 * get current user's shopping cart
 */
router.get('/cart', async (req, res) => {
	const user = req.user

	try {
		const data = await getCart(user.id)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

/**
 * update purchase items in shopping cart, return cart
 * This is used buy a registered user login after using the cart.
 * in this case, we meed use this to replace the existing cart
 */
// router.put('/cart', async (req, res) => {
// 	const token = req.params.token
// 	try {
// 		const data = await googleLogin(token)
// 		return res.status(200).json(data)
// 	} catch (err) {
// 		return res.status(500).json(err)
// 	}
// })

/**
 * get current user's orders, return list of order
 */
router.get('/', async (req, res) => {
	const token = req.params.token
	try {
		const data = await googleLogin(token)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

/**
 * get current user's order by order id
 */
router.get('/:id', async (req, res) => {
	const token = req.params.token
	try {
		const data = await googleLogin(token)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

/**
 * pay cart items and create order
 */
router.post('/buy', async (req, res) => {
	const token = req.params.token
	try {
		const data = await googleLogin(token)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

export default router
