import _ from 'lodash'

///////////////////////////////////////////////////////////////////
//
// reduxCart[sku]={product, quantity}
//
///////////////////////////////////////////////////////////////////
/**
 * update an cart item quantity, reutrn cart
 */
export const setCartItemQuantity = (cart, sku, quantity) => {
	if (cart == null) cart = {}
	if (_.has(cart, sku)) {
		cart[sku].quantity = quantity
	}
	return cart
}
/**
 * count total number of items in the cart
 * @param {object} cart 
 */
export const countItems = (cart) => {
	return Object.keys(cart).reduce((sum, key) => sum + cart[key].quantity, 0)
} 

/**
 * count subtotal price for items in the cart
 * @param {object} cart 
 */
export const subTotal = (cart) => {
	return Object.keys(cart).reduce((sum, key) => sum + (cart[key].quantity * cart[key].product.price), 0).toFixed(2)
}
/**
 * add cart items, reutrn cart
 * items = [
 *		{ sku: product.sku, quantity: values.amount, product: product },
 * ]
 */
export const addCartItems = (cart, items) => {
	// if cart is null/undefined, create one
	if (cart == null) cart = {}
	// if cart alrealy have the sku, increase the quantity only
	items.forEach((e) => {
		if (_.has(cart, e.sku)) {
			cart[e.sku].quantity = cart[e.sku].quantity * 1 + e.quantity * 1
			cart[e.sku].product = e.product
		} else {
			const k = { quantity: e.quantity, product: e.product }
			cart[e.sku] = k
		}
	})
	return cart
}

/**
 * remove cart items, reutrn cart
 */
export const removeCartItems = (cart, skus) => {
	skus.forEach((sku) => {
		_.unset(cart, sku)
	})
	return cart
}
