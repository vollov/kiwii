import {
	SET_QUANTITY_SUCCESS,
	SET_QUANTITY_ERROR,
	ADD_CART_ITEM_ERROR,
	ADD_CART_ITEM_SUCCESS,
	REMOVE_CART_ITEM_ERROR,
	REMOVE_CART_ITEM_SUCCESS,
	SYNC_CART_SUCCESS,
	SYNC_CART_ERROR,
	CLEAR_CART,
} from 'stores/actions/order'
import {
	addCartItems,
	setCartItemQuantity,
	removeCartItems,
	countItems,
	subTotal
} from 'stores/service/order'
import log from 'libs/log'

const initialState = {
	cart: null, // reduxCart[sku]={p, quantity}
	itemsTotal: 0,
	subTotal:0,
	total: 0,
	err: null,
	cartSynced: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_CART:
			return {
				...state,
				cart: {},
				cartSynced: false,
			}
		case SET_QUANTITY_SUCCESS:
			const req = action.data
			log.trace(
				`[Cart Reducer]->SET_QUANTITY_SUCCESS, req=${JSON.stringify(req)}`
			)
			return {
				...state,
				cart: setCartItemQuantity(state.cart, req.sku, req.quantity),
				itemsTotal: countItems(state.cart),
				subTotal: subTotal(state.cart)
			}
		case ADD_CART_ITEM_SUCCESS:
			const items = action.data
			log.trace(
				`[Cart Reducer]->ADD_CART_ITEM_SUCCESS, action.data=${JSON.stringify(
					items
				)}`
			)
			return {
				...state,
				cart: addCartItems(state.cart, items),
				itemsTotal: countItems(state.cart),
				subTotal: subTotal(state.cart)
			}
		case REMOVE_CART_ITEM_SUCCESS:
			const skus = action.data
			log.trace(
				`[Cart Reducer]->REMOVE_CART_ITEM_SUCCESS, skus=${JSON.stringify(skus)}`
			)
			return {
				...state,
				cart: removeCartItems(state.cart, skus),
				itemsTotal: countItems(state.cart),
				subTotal: subTotal(state.cart)
			}
		case SYNC_CART_SUCCESS:
			log.trace(
				`[Cart Reducer]->SYNC_CART_SUCCESS, data=${JSON.stringify(action.data)}`
			)
			return {
				...state,
				cart: action.data,
				cartSynced: true,
				itemsTotal: countItems(state.cart),
				subTotal: subTotal(state.cart)
			}
		case SYNC_CART_ERROR:
			log.error(`[Cart Reducer]->SYNC_CART_ERROR, err=${action.err}`)
			return {
				...state,
				err: action.err,
			}
		case SET_QUANTITY_ERROR:
			log.error(`[Cart Reducer]->SET_QUANTITY_ERROR, err=${action.err}`)
			return {
				...state,
				err: action.err,
			}
		case ADD_CART_ITEM_ERROR:
			log.error(`[Cart Reducer]->ADD_CART_ITEM_ERROR, err=${action.err}`)
			return {
				...state,
				err: action.err,
			}
		case REMOVE_CART_ITEM_ERROR:
			log.error(`[Cart Reducer]->REMOVE_CART_ITEM_ERROR, err=${action.err}`)
			return {
				...state,
				err: action.err,
			}
		default:
			return state
	}
}
