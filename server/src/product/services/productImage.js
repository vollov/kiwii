import { ProductImage } from '~/src/models/product'

const listImages = (sku) => {
	// use exec to return a promise
	return ProductImage.find({ sku: sku })
		.sort({ sequence: 1 }) // //Sort by name Added ASC
		.exec()
}

const getFirst = (sku) => {
	return ProductImage.findOne({ sku: sku })
		.sort({ sequence: 1 }) // //Sort by name Added ASC
		.exec()
}

const addImage = (data) => {
	return new ProductImage(data).save()
}

const removeImage = (id) => {
	return ProductImage.deleteOne({ _id: id }).exec()
}

const findImage = (id) => {
	return ProductImage.find({ _id: id }).exec()
}

const updateImage = (id, data) => {
	return ProductImage.findByIdAndUpdate(id, data, { new: true }).exec()
}

const batchAddImages = async (data) => {
	const r = await ProductImage.collection.insert(data)
	return r
}

export { listImages, addImage, findImage, updateImage, removeImage, batchAddImages, getFirst }
