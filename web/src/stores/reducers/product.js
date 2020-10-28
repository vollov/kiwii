import {
	LIST_PRODUCTS_SUCCESS,
	LIST_PRODUCTS_ERROR,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_ERROR,
} from 'stores/actions/product'

import log from 'libs/log'

const initialState = {
	products: null,
	error: null,
	product: null,
	id: null, // current selected id
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LIST_PRODUCTS_SUCCESS:
			log.trace(
				`[Product Reducer]->LIST_PRODUCT_SUCCESS, action.data.data=${JSON.stringify(
					action.data.data
				)}`
			)
			return {
				...state,
				products: action.data.data,
			}
		case LIST_PRODUCTS_ERROR:
			log.error(`[Product Reducer]->LIST_PRODUCTS_ERROR, err=${action.err}`)
			return state
		case GET_PRODUCT_SUCCESS:
			log.trace(
				`[Product Reducer]->GET_PRODUCT_SUCCESS, action.data=${JSON.stringify(
					action.data
				)}`
			)
			return {
				...state,
				product: action.data,
			}
		case GET_PRODUCT_ERROR:
			log.error(`[Product Reducer]->GET_PRODUCT_ERROR, err=${action.err}`)
			return state
		default:
			return state
	}
}
