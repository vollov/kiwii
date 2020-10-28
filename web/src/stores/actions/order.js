import log from 'libs/log'
import _ from 'lodash'
import { authState } from 'stores/actions/auth'
import axios from 'libs/client'

// cart actions
export const SET_QUANTITY_SUCCESS = 'SET_QUANTITY_SUCCESS'
export const SET_QUANTITY_ERROR = 'SET_QUANTITY_ERROR'

export const ADD_CART_ITEM_SUCCESS = 'ADD_CART_ITEM_SUCCESS'
export const ADD_CART_ITEM_ERROR = 'ADD_CART_ITEM_ERROR'

export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS'
export const REMOVE_CART_ITEM_ERROR = 'REMOVE_CART_ITEM_ERROR'

export const LOAD_CART_SUCCESS = 'LOAD_CART_SUCCESS'
export const LOAD_CART_ERROR = 'LOAD_CART_ERROR'

export const SYNC_CART_SUCCESS = 'SYNC_CART_SUCCESS'
export const SYNC_CART_ERROR = 'SYNC_CART_ERROR'

export const CLEAR_CART = 'CLEAR_CART'
export const orderState = {}

/**
 * clear local store after logout
 */
export const clearCart = () => {
	return (dispatch) => {
		dispatch({ type: CLEAR_CART })
	}
}
/**
 * set number of items in shopping cart
 * update remote cart
 */
export const setQuantity = (sku, quantity) => {
	return async (dispatch, getState) => {
		const authStatus = getState().auth.status
		if (authStatus === authState.LOGIN) {
			try {
				const data = axios.put(`/orders/cart/${sku}`, {
					quantity: quantity,
				})

				// if status code = 401, remove jwt from local storage
				// if status code = 500, dispatch LOGOUT_ERROR, remove jwt from local storage
				// do normal business process

				log.trace(
					`[Action.Order] setQuantity return data=${JSON.stringify(data)}`
				)
				// TODO: log error based on write result
				dispatch({
					type: SET_QUANTITY_SUCCESS,
					data: { sku: sku, quantity: quantity },
				})
			} catch (err) {
				dispatch({ type: SET_QUANTITY_ERROR, err })
			}
		} else {
			dispatch({
				type: SET_QUANTITY_SUCCESS,
				data: { sku: sku, quantity: quantity },
			})
		}
	}
}

/**
 * remove purchase items from cart
 * items = [
 *			{ sku: product.sku, quantity: values.amount, product: product },
 *	]
 */
export const addCartItems = (items) => {
	return async (dispatch, getState) => {
		const authStatus = getState().auth.status
		if (authStatus === authState.LOGIN) {
			try {
				// server save sku and quantity only
				const payload = items.map((i) => {
					return { sku: i.sku, quantity: i.quantity }
				})
				const data = axios.post('/orders/cart', payload)
				log.trace(
					`[Action.Order] addCartItems return data=${JSON.stringify(data)}`
				)
				// TODO: log error based on write result
				dispatch({ type: ADD_CART_ITEM_SUCCESS, data: items })
			} catch (err) {
				dispatch({ type: ADD_CART_ITEM_ERROR, err })
			}
		} else {
			dispatch({ type: ADD_CART_ITEM_SUCCESS, data: items })
		}
	}
}

/**
 * remove purchase items from cart by array of skus
 */
export const removeCartItems = (skus) => {
	return async (dispatch, getState) => {
		const authStatus = getState().auth.status
		log.trace(`[Action.Order] removeCartItems login status=${authStatus}`)
		if (authStatus === authState.LOGIN) {
			try {
				const data = axios.post('/orders/cart/delete', skus)
				log.trace(
					`[Action.Order] removeCartItems return data=${JSON.stringify(data)}`
				)
				// TODO: log error based on write result
				dispatch({ type: REMOVE_CART_ITEM_SUCCESS, data: skus })
			} catch (err) {
				dispatch({ type: REMOVE_CART_ITEM_ERROR, err })
			}
		} else {
			dispatch({ type: REMOVE_CART_ITEM_SUCCESS, data: skus })
		}
	}
}

/**
 * action called after user log in
 * - upload cart to server
 * - download cart from server
 */
export const snycCart = () => {

	return async (dispatch, getState) => {
		const authStatus = getState().auth.status
		const cartSynced = getState().order.cartSynced
		log.trace(`[Cart Action].calling snycCart(), authStatus=${authStatus}`)
		// sync shopping cart only when logged in
		if (!cartSynced && authStatus === authState.LOGIN) {
			try {
				// push redux cart to server
				const reduxCart = getState().order.cart
				// map reduxCart[sku]={p, quantity} => [{sku, quantity}]
				const payload = _.keys(reduxCart).map((sku) => {
					return { sku: sku, quantity: reduxCart[sku].quantity }
				})
				log.trace(
					`[Cart Action].calling snycCart() payload=${JSON.stringify(payload)}`
				)

				// post to server if payload is not empty
				if (payload !== null && payload.length > 0) {
					//await securedPost('/orders/cart', token, 'POST', payload)
					await axios.post('/orders/cart', payload)
				}

				// persiste reduxCart[sku]={p, quantity}
				// const data = await securedGet('/orders/cart', token, 'GET')
				const data = await axios.get('/orders/cart')
				log.trace(
					`[Cart Action].calling snycCart() getCart=${JSON.stringify(data)}`
				)
				dispatch({ type: SYNC_CART_SUCCESS, data })
			} catch (err) {
				dispatch({ type: SYNC_CART_ERROR, err })
			}
		}
	}
}
