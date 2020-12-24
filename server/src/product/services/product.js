import _ from 'lodash'
import { Product } from '../../models/product'

/**
 * list products
 * @param {int} year
 * @param {string} id
 */
const list = async () => {
	// use exec to return a promise
	
	const r = await Product.find({})
			.populate({ path: 'brand', select: 'name' })
			//.populate({ path: 'images', select: 'sku name thumbs path' })
			// .select('name sku imageUrl price image')
			.exec()
	
	return r
}

const batchInsert = async (data) => {
	const r = await Product.collection.insert(data)
	return r
}

const add = async (data) => {
	const p = await new Product(data).save()
	return p.populate('brand').populate('images').execPopulate()
}

const remove = (id) => {
	return Product.deleteOne({ _id: id }).exec()
}

/**
 * find products by sku
 */
const find = (sku) => {
	return Product.findOne({ sku: sku })
		.populate('brand')
		.populate('images')
		.exec()
}

const update = (id, data) => {
	return Product.findByIdAndUpdate(id, data, { new: true }).exec()
}

export { list, add, find, update, remove, batchInsert }
