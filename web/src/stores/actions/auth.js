import axios from 'libs/client'
import log from 'libs/log'

import { snycCart, clearCart } from 'stores/actions/order'
import { clearPubkey, loadPubkey } from 'stores/actions/payment'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

//export const

export const authState = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
}

/**
 * logout
 * - call logout url with jwt token
 * - clear local cart
 * - clear payment key
 * - clear local jwt token
 * private api: unregister user in redis
 */
export const logout = () => {
	return async (dispatch) => {
		try {
			await axios.get(`/auth/logout`)

			dispatch({ type: LOGOUT_SUCCESS })
			// clear redux.cart
			dispatch(clearCart())
			// clear redux.payment_pubkey
			dispatch(clearPubkey())
		} catch (err) {
			// request server api failure
			log.error(
				`[logout] request server api failure, err=${JSON.stringify(err)}`
			)
			dispatch({ type: LOGOUT_ERROR, err })
		}
	}
}

/**
 * save jwt token in local storage
 * save user data in redux
 */
export const googleLogin = (token) => {
	return async (dispatch) => {
		try {
			// HTTP POST to register user with access_token
			const res = await axios.get(`/auth/google/login/${token}`)
			// TODO: save jwt token in local storage
			log.debug(`auth actions, googleLogin return res=${JSON.stringify(res)}`)
			// save user data in redux
			// data = { user: { firstName, lastName, email }, token: token }
			dispatch({ type: LOGIN_SUCCESS, data: res.data })
			// sync the cart with server (upload cart + download cart)
			dispatch(snycCart())
			// loading payment pubkey
			dispatch(loadPubkey())
		} catch (err) {
			log.error('getJwtGoolge LOGIN_ERROR err=%j', err)
			dispatch({ type: LOGIN_ERROR, err })
		}
	}
}

/**
 * handle facebook code
 * @param {string} token
 */
export const facebookLogin = (code) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/auth/facebook/login/${code}`)
			log.trace(
				`auth actions, facebook login return res=${JSON.stringify(res)}`
			)
		} catch (err) {
			log.error(`request facebook/login/${code} error, err=${err}`)
		}
	}
}
