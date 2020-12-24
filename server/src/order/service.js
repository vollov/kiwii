import _ from 'lodash'
import { Cart } from '../models/order'
import log from '../lib/logger'

import axios from '../lib/client'
import { INTERNAL_ERROR } from '../lib/codes'

///////////////////////////////////////////////////////////////////
//
// dbCart={user, purchases=[{sku:quantity}...]}
//
///////////////////////////////////////////////////////////////////

/**
 * add purchase items, return cart
 * purchase={sku,quantity}
 */
const addItems = async (uid, items) => {
	// items = [
	// 		{ sku: product.sku, quantity: values.amount },
	// 	]
	// TODO: add valid sku only
	let cart = await Cart.findOne({ user: uid }).exec()
	log.trace(
		`[order] rest service, addItems cart=${JSON.stringify(
			cart
		)}, items=${JSON.stringify(items)}`
	)
	// if no cart exists, create one with sku
	if (cart == null) {
		let purchases = {}
		log.trace(
			`[order] rest service, addItems, purchases=${JSON.stringify(purchases)}`
		)
		items.forEach((i) => {
			purchases[i.sku] = i.quantity
		})
		log.trace(
			`[order] rest service, addItems purchases=${JSON.stringify(purchases)}`
		)
		const r = await new Cart({ purchases: purchases, user: uid }).save()
		return r
	} else {
		log.trace(`[order] rest service, addItems cart is not empty`)

		// calculate the item quantity
		let purchases = cart.purchases
		items.forEach((i) => {
			log.trace(`[order] rest service, i.sku=${i.sku}`)
			if (_.has(purchases, i.sku)) {
				log.trace(
					`[order] rest service, p=${purchases[i.sku]}, i.q=${i.quantity}`
				)
				purchases[i.sku] = purchases[i.sku] * 1 + i.quantity * 1
			} else {
				log.trace(`[order] rest service, i.q=${i.quantity}`)
				purchases[i.sku] = i.quantity * 1
			}
		})
		log.trace(
			`[order] rest service, addItems purchases=${JSON.stringify(purchases)}`
		)

		return await Cart.updateOne(
			{ _id: cart._id },
			{ purchases: purchases }
		).exec()
	}
}

/**
 * update purchase item quantity, return cart
 */
const setQuantity = async (uid, sku, quantity) => {
	// find cart by user id update quantity by sku
	let cart = await Cart.findOne({ user: uid }).exec()
	// if no cart exists, create one with sku
	if (cart == null) {
		let purchases = {}
		purchases[sku] = quantity * 1
		return await new Cart({ purchases: purchases, user: uid }).save()
	}

	let purchases = cart.purchases
	purchases[sku] = quantity * 1

	return await Cart.updateOne(
		{ _id: cart._id },
		{ purchases: purchases }
	).exec()
}

/**
 * remove purchase items from cart, return cart
 */
const removeItems = async (uid, skus) => {
	let cart = await Cart.findOne({ user: uid }).exec()
	// if no cart exists, create one with sku
	if (cart == null) {
		log.error(`remove items from empty cart, user-id= ${uid}`)
		return null
	}

	let purchases = cart.purchases
	skus.forEach((sku) => {
		_.unset(purchases, sku)
	})

	return await Cart.updateOne(
		{ _id: cart._id },
		{ purchases: purchases }
	).exec()
}

/**
 * get current user's shopping cart by user id
 */
const getCart = async (uid) => {
	let cart = await Cart.findOne({ user: uid }).exec()
	log.debug(`[order] service, getCart() cart=${JSON.stringify(cart)}`)
	if (cart == null) {
		// return empty cart if not found
		return {}
	}

	let r = {}
	// dbCart={user, purchases={sku:quantity} => reduxCart[sku]={product, quantity}
	for (const key in cart.purchases) {
		// query product service via rest
		log.debug(`[order] service, getCart() query product sku=${key}`)

		// TODO: handle rest request and exceptions
		try {
			let res = await axios.get(`/products/${key}`)
			r[key] = { product: res.data, quantity: cart.purchases[key] }
		} catch (err) {
			console.log(`error=${err}`)
			log.error(
				`[order] service, query product(sku=${sku}) error=${JSON.stringify(
					err
				)}`
			)
			throw new Error(INTERNAL_ERROR)
		}
	}

	log.debug(`[order] service, getCart() return r=${JSON.stringify(r)}`)
	return r
}

/**
 * get current user's orders by user id
 */
const orders = async (uid) => {}

/**
 * get current user's order by order id
 */
const order = async (oid) => {}

/**
 * pay cart items and create order, return order
 */
const pay = async (items, uid) => {}

/**
 * place an order
 * @param {object} order
 */
const placeOrder = (order) => {}

export { setQuantity, removeItems, addItems, getCart }
