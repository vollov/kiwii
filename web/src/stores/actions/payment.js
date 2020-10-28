import log from 'libs/log'
import _ from 'lodash'
import { authState } from 'stores/actions/auth'
import { securedPost, securedGet } from 'libs/utils'

export const SAVE_ADDRESS_SUCCESS = 'SAVE_ADDRESS_SUCCESS'
export const SAVE_ADDRESS_ERROR = 'SAVE_ADDRESS_ERROR'

export const GET_SHIPPING_ADDRESS_SUCCESS = 'GET_SHIPPING_ADDRESS_SUCCESS'
export const GET_SHIPPING_ADDRESS_ERROR = 'GET_SHIPPING_ADDRESS_ERROR'

export const GET_BILLING_ADDRESS_SUCCESS = 'GET_BILLING_ADDRESS_SUCCESS'
export const GET_BILLING_ADDRESS_ERROR = 'GET_BILLING_ADDRESS_ERROR'

export const CLEAR_PUBKEY = 'CLEAR_PUBKEY'
export const LOAD_PUBKEY_SUCCESS = 'LOAD_PUBKEY_SUCCESS'
export const LOAD_PUBKEY_ERROR = 'LOAD_PUBKEY_ERROR'

export const saveAddress = (a) => {
	return async (dispatch, getState) => {
		const authStatus = getState().auth.status

		log.trace(`[Action.Payment] saveAddress authStatus=${authStatus}`)

		// save address for registered user only
		if (authStatus === authState.LOGIN) {
			try {
				const token = getState().auth.jwtToken

				const postcode = a.postcode.replace(/\s/g, '')
				const address = { ...a, postcode: postcode }
				const data = await securedPost(
					`/payments/addresses/`,
					token,
					'POST',
					address
				)
				log.trace(
					`[Action.Payment] saveAddress return data=${JSON.stringify(data)}`
				)
				// TODO: log error based on write result
				dispatch({
					type: SAVE_ADDRESS_SUCCESS,
					data: data.pubkey,
				})
			} catch (err) {
				dispatch({ type: SAVE_ADDRESS_ERROR, err })
			}
		}
	}
}

/**
 * get user's shipping address
 */
export const getShippingAddress = () => {
	return async (dispatch, getState) => {
		const authStatus = getState().auth.status
		log.trace(`[Action.Payment] getShippingAddress  authStatus=${authStatus}`)
		// get address for registered user only
		if (authStatus === authState.LOGIN) {
			try {
				const token = getState().auth.jwtToken

				const data = await securedGet(`/payments/addresses/S`, token, 'GET')
				log.trace(
					`[Action.Payment] getShippingAddress return data=${JSON.stringify(
						data
					)}`
				)
				// TODO: log error based on write result
				dispatch({
					type: GET_SHIPPING_ADDRESS_SUCCESS,
					data: data,
				})
			} catch (err) {
				dispatch({ type: GET_SHIPPING_ADDRESS_ERROR, err })
			}
		}
	}
}

/**
 * get user's billing address
 */
export const getBillingAddress = () => {
	return async (dispatch, getState) => {
		const authStatus = getState().auth.status
		// get address for registered user only
		if (authStatus === authState.LOGIN) {
			try {
				const token = getState().auth.jwtToken

				const data = await securedGet(`/payments/addresses/B`, token, 'GET')
				log.trace(
					`[Action.Payment] getBillingAddress return data=${JSON.stringify(
						data
					)}`
				)
				// TODO: log error based on write result
				dispatch({
					type: GET_BILLING_ADDRESS_SUCCESS,
					data: data,
				})
			} catch (err) {
				dispatch({ type: GET_BILLING_ADDRESS_ERROR, err })
			}
		}
	}
}

export const clearPubkey = () => {
	return (dispatch) => {
		dispatch({ type: CLEAR_PUBKEY })
	}
}

export const loadPubkey = () => {
	log.trace(`[Payment Action].loadPubkey()`)
	return async (dispatch, getState) => {
		const authStatus = getState().auth.status
		if (authStatus === authState.LOGIN) {
			// overwrite pukey

			const token = getState().auth.jwtToken
			try {
				const data = await securedGet('/payments/key', token, 'GET')
				log.trace(`[Payment Action].loadPubkey() data=${JSON.stringify(data)}`)
				dispatch({ type: LOAD_PUBKEY_SUCCESS, data })
			} catch (err) {
				dispatch({ type: LOAD_PUBKEY_ERROR, err })
			}
		}
	}
}
