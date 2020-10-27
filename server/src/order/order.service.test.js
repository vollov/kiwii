import mongoose from 'mongoose'
import User from '~/src/models/user'
import log from '~/src/lib/logger'
import { setQuantity, removeItems, addItems } from '~/src/order/service'
/**
 * https://zellwk.com/blog/jest-and-mongoose/
 */
const databaseName = 'shops_test'

beforeAll(async () => {
	// Connect to a Mongo DB
	const url = `mongodb://127.0.0.1/${databaseName}`
	await mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
})

describe('order db service', () => {
	it('setQuantity is a function', async (done) => {
		expect(typeof setQuantity).toEqual('function')
		done()
	})

	it('removeItems is a function', async (done) => {
		expect(typeof removeItems).toEqual('function')
		done()
	})

	it('addItems is a function', async (done) => {
		expect(typeof addItems).toEqual('function')
		done()
	})

	it('addItems should be able to add item', async (done) => {
		// const skus = ['a001', 'a002']
		const items = [
			{ sku: 'a001', quantity: 2 },
			{ sku: 'a002', quantity: 1 },
		]

		const u1 = new User({
			firstName: 'Dustin',
			lastName: 'Zhang',
			email: 'aa@abc.ca',
		}).save()
		const cart = await addItems(u1._id, items)
		log.trace(`add item, cart=${JSON.stringify(cart)}`)

		const items2 = [
			{ sku: 'a001', quantity: 3 },
			{ sku: 'a002', quantity: 2 },
		]
		const r = await addItems(u1._id, items2)
		log.trace(`add item, r=${JSON.stringify(r)}`)
		done()
	})

	it('removeItems should be able to remove items', async (done) => {
		const skus = ['a001', 'a002']
		const items = [
			{ sku: 'a001', quantity: 2 },
			{ sku: 'a002', quantity: 11 },
			{ sku: 'a003', quantity: 3 },
			{ sku: 'a004', quantity: 8 },
		]

		const u1 = new User({
			firstName: 'Dustin',
			lastName: 'Zhang',
			email: 'aa@abc.ca',
		}).save()
		const cart = await addItems(u1._id, items)

		const r = await removeItems(u1._id, skus)
		log.trace(`add item, r=${JSON.stringify(r)}`)
		done()
	})

	it('setQuantity should be able to update', async (done) => {
		const items = [
			{ sku: 'a001', quantity: 2 },
			{ sku: 'a002', quantity: 11 },
			{ sku: 'a003', quantity: 3 },
			{ sku: 'a004', quantity: 8 },
		]

		const u1 = new User({
			firstName: 'Dustin',
			lastName: 'Zhang',
			email: 'aa@abc.ca',
		}).save()
		await addItems(u1._id, items)

		const r = await setQuantity(u1._id, 'a003', 5)
		log.trace(`setQuantity, r=${JSON.stringify(r)}`)
		done()
	})
})

// Cleans up database between each test
afterEach(async () => {
	await removeAllCollections()
})

// Disconnect Mongoose
afterAll(async () => {
	await dropAllCollections()
	await mongoose.connection.close()
})

const removeAllCollections = async () => {
	const collections = Object.keys(mongoose.connection.collections)
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName]
		await collection.deleteMany()
	}
}

const dropAllCollections = async () => {
	const collections = Object.keys(mongoose.connection.collections)
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName]
		try {
			await collection.drop()
		} catch (error) {
			// Sometimes this error happens, but you can safely ignore it
			if (error.message === 'ns not found') return
			// This error occurs when you use it.todo. You can
			// safely ignore this error too
			if (error.message.includes('a background operation is currently running'))
				return
			console.log(error.message)
		}
	}
}
