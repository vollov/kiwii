import cfg from '../config'
import log from '../lib/logger'
import { Address } from '../models/payment'
import client from 'stripe'

import { INVALID_REQUEST } from '../lib/codes'

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = client(cfg.stripe.key.secret)

/**
 * pay an order
 * @param {object} data
 * refer: https://stripe.com/docs/payments/accept-a-payment-charges
 */
const pay = (data) => {
	const { amount, tokenId, description } = data.amount

	return stripe.charges.create({
		amount: amount,
		currency: cfg.stripe.currency,
		description: description,
		source: tokenId,
	})
}

const stripePubKey = () => {
	return {
		pubkey: cfg.stripe.key.public,
	}
}

const findAddresses = async (uid, type) => {
	return await Address.findOne({ user: uid }).exec()
}

/**
 * Delete address by id
 */
const deleteAddresses = (id) => {
	return Address.deleteOne({ _id: id }).exec()
}

/**
 * get address by type (selling, billing, default)
 * @param {string} uid
 * @param {string} type S,B,D
 */
const getAddress = async (uid, type) => {
	if (!type) {
		throw new Error(INVALID_REQUEST)
	}

	log.trace(`[Payment.Service] getAddress() type = ${type}, user id =${uid}`)

	if (type.toUpperCase() == 'D') {
		return await Address.findOne({
			user: uid,
			default: true,
		}).exec()
	} else {
		return await Address.findOne({
			user: uid,
			type: type.toUpperCase(),
		}).exec()
	}
}

const saveAddress = async (uid, address) => {
	if (address.default === true) {
		// disable all other billings
		log.trace(`update address default=false, type = ${address.type}`)
		await Address.updateMany(
			{ user: uid, type: address.type },
			{ default: false }
		)
	}

	const x = { ...address, user: uid }
	log.trace(`save address address=${JSON.stringify(x)}`)
	return await new Address(x).save()
}

const updateAddress = (uid, id, address) => {}

const intentSecret = async (payment) => {
	const paymentIntent = await stripe.paymentIntents.create(payment)
	return { client_secret: paymentIntent.client_secret }
}

export {
	pay,
	stripePubKey,
	findAddresses,
	getAddress,
	saveAddress,
	updateAddress,
	deleteAddresses,
	intentSecret,
}
