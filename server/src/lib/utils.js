import _ from 'lodash'

const whiteTable = {
	GET: [
		/\/api\/auth\/google\/login\/*/g,
		/\/api\/products\/*/g,
		/\/api\/products/g,
	],
	POST: [/\/api\/auth\/login/g],
}

export const publicAPI = (method, path) => {
	const checkList = whiteTable[method]
	return _.some(checkList, (item) => item.test(path))
}
