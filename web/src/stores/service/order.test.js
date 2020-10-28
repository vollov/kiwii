import { addCartItems, setCartItemQuantity, removeCartItems } from './order'

describe('order redux service', () => {
	it('addCartItems is a function', () => {
		expect(typeof addCartItems).toEqual('function')
	})

	it('addCartItems can merge a cart', () => {
		let cart = {}
		cart['sku1'] = { sku: 'sku1', quantity: 2 }
		cart['sku2'] = { sku: 'sku2', quantity: 3 }
		cart['sku3'] = { sku: 'sku3', quantity: 4 }

		let items = [
			{ sku: 'sku2', quantity: 2 },
			{ sku: 'sku4', quantity: 12 },
		]
		const r = addCartItems(cart, items)
		// console.log(
		// 	`addCartItems cart=${JSON.stringify(cart)} return r=${JSON.stringify(r)}`
		// )
		expect(r['sku2'].quantity).toEqual(5)
	})

	it('setCartItemQuantity can set sku2 to 1', () => {
		let cart = {}
		cart['sku1'] = { sku: 'sku1', quantity: 2 }
		cart['sku2'] = { sku: 'sku2', quantity: 3 }
		cart['sku3'] = { sku: 'sku3', quantity: 4 }

		const r = setCartItemQuantity(cart, 'sku2', 1)
		// console.log(
		// 	`addCartItems cart=${JSON.stringify(cart)} return r=${JSON.stringify(r)}`
		// )
		expect(r['sku2'].quantity).toEqual(1)
	})

	it('removeCartItems can remove sku2', () => {
		let cart = {}
		cart['sku1'] = { sku: 'sku1', quantity: 2 }
		cart['sku2'] = { sku: 'sku2', quantity: 3 }
		cart['sku3'] = { sku: 'sku3', quantity: 4 }

		const r = removeCartItems(cart, ['sku2', 'sku5'])
		// console.log(
		// 	`addCartItems cart=${JSON.stringify(cart)} return r=${JSON.stringify(r)}`
		// )
		expect(Object.keys(r).length).toEqual(2)
	})
})
