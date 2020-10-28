import _ from "lodash";

const add = (products, product) => {
	if (!products) products = [];
	return _.concat(products, _.cloneDeep(product));
};

const update = (products, product) => {
	let idx = _.findIndex(products, p => {
		return p.id === product.id;
	});

	let result = _.cloneDeep(products);
	result[idx] = _.cloneDeep(product);
	return result;
};

const get = (products, id) => {
	let r = _.find(products, p => {
		return p.id === id;
	});
	return _.cloneDeep(r);
};

const remove = (products, id) => {
	return _.reject(products, p => {
		return p.id === id;
	});
	//return _.cloneDeep(r);
};

export default {
	add,
	update,
	remove,
	get
};
