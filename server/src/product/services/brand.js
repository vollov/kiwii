import { Brand } from '~/src/models/product'

const list = () => {
	// use exec to return a promise
	return Brand.find({})
		.sort({ name: 1 }) // //Sort by name Added ASC
		.exec()
}

const add = (data) => {
	return new Brand(data).save()
}

const remove = (id) => {
	return Brand.deleteOne({ _id: id }).exec()
}

const find = (name) => {
	return Brand.find({ name: name }).exec()
}

const update = (id, data) => {
	return Brand.findByIdAndUpdate(id, data, { new: true }).exec()
}

export { list, add, find, update, remove }
