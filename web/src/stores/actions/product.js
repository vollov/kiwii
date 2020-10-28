import log from 'libs/log'
import axios from 'libs/client'

export const LIST_PRODUCTS_SUCCESS = 'LIST_PRODUCTS_SUCCESS'
export const LIST_PRODUCTS_ERROR = 'LIST_PRODUCTS_ERROR'
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR'

export const listProduct = () => {
	return async (dispatch) => {
		try {
			const data = await axios.get('/products/')
			log.trace(
				`[Action.Product] listProduct return data=${JSON.stringify(data)}`
			)
			dispatch({ type: LIST_PRODUCTS_SUCCESS, data })
		} catch (err) {
			dispatch({ type: LIST_PRODUCTS_ERROR, err })
		}
	}
}

/**
 * get product  by sku
 */
export const getProduct = (sku) => {
	return async (dispatch, getState) => {
		try {
			// const products = getState().products
			// log.trace(
			// 	`[Action.Product] getProduct, products=${JSON.stringify(products)}`
			// )
			// const product = products.find((p) => p.sku === sku)
			// const data = _.cloneDeep(product)

			const data = await axios.get(`/products/${sku}`)
			log.trace(
				`[Action.Product] getProduct, sku=${sku}, found product=${JSON.stringify(
					data
				)}`
			)
			dispatch({ type: GET_PRODUCT_SUCCESS, data })
		} catch (err) {
			dispatch({ type: GET_PRODUCT_ERROR, err })
		}
	}
}
