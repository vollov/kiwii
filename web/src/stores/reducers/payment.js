import {
	SAVE_ADDRESS_SUCCESS,
	SAVE_ADDRESS_ERROR,
	GET_SHIPPING_ADDRESS_SUCCESS,
	GET_SHIPPING_ADDRESS_ERROR,
	GET_BILLING_ADDRESS_SUCCESS,
	GET_BILLING_ADDRESS_ERROR,
	LOAD_PUBKEY_SUCCESS,
	LOAD_PUBKEY_ERROR,
	CLEAR_PUBKEY,
} from 'stores/actions/payment'
import log from 'libs/log'

const initialState = {
	pubkey: null,
	billingAddress: null,
	shippingAddress: null,
	otherAddresses: [], // always fetch from server, do not use cache
	err: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_ADDRESS_SUCCESS:
			const address = action.data
			if (address.type === 'B' && address.default === true) {
				return {
					...state,
					billingAddress: address,
				}
			}
			if (address.type === 'S' && address.default === true) {
				return {
					...state,
					shippingAddress: address,
				}
			}
			return state
		case GET_SHIPPING_ADDRESS_SUCCESS:
			log.trace(
				`[Payment Reducer]->GET_SHIPPING_ADDRESS_SUCCESS, action.data=${JSON.stringify(
					action.data
				)}`
			)
			return {
				...state,
				shippingAddress: action.data,
			}
		case GET_BILLING_ADDRESS_SUCCESS:
			log.trace(
				`[Payment Reducer]->GET_BILLING_ADDRESS_SUCCESS, action.data=${JSON.stringify(
					action.data
				)}`
			)
			return {
				...state,
				billingAddress: action.data,
			}
		case CLEAR_PUBKEY:
			return {
				...state,
				pubkey: null,
			}
		case LOAD_PUBKEY_SUCCESS:
			return {
				...state,
				pubkey: action.data,
			}
		case SAVE_ADDRESS_ERROR:
			log.error(`[Payment Reducer]->SAVE_ADDRESS_ERROR, err=${action.err}`)
			return {
				...state,
				err: action.err,
			}
		case GET_BILLING_ADDRESS_ERROR:
			log.error(
				`[Payment Reducer]->GET_BILLING_ADDRESS_ERROR, err=${action.err}`
			)
			return {
				...state,
				err: action.err,
			}
		case GET_SHIPPING_ADDRESS_ERROR:
			log.error(
				`[Payment Reducer]->GET_SHIPPING_ADDRESS_ERROR, err=${action.err}`
			)
			return {
				...state,
				err: action.err,
			}
		default:
			return state
	}
}
