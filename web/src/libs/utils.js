import _ from 'lodash'
import cfg from 'config'
import log from 'libs/log'

/**
 * Find the largest item.index, return index++
 * @param {Array} list
 */
export const nextIndex = (list) => {
	if (list === undefined || list.length === 0) {
		return 1
	} else {
		return _.last(list).index + 1
	}
}

export const findById = (list, id) => {
	return _.find(list, { id: id })
}

/**
 * if status code = 401:
 * 	- remove jwt from local storage
 *	- run logout routin: clear shopping cart
 * @param {*} response - fetch response object
 */
const checkJWT = (response) => {
	// remove jwt from local storage if we have 401
	if (response.status == 401) {
	}
}
/**
 * request for post/put/patch
 *
 * response:
 *  - error = {code, statusCode}
 *  - data = object
 */
export const securedPost = async (url, token, method, payload) => {
	log.trace(`[utils].auth post with token=${token}`)
	let response = await fetch(cfg.rest.BASE_URL + url, {
		method: method,
		headers: {
			Authorization: 'Bearer ' + token,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(payload),
	})

	return await response.json()
}

export const securedGet = async (url, token, method) => {
	log.trace(`[utils].auth get with token=${token}`)
	let response = await fetch(cfg.rest.BASE_URL + url, {
		method: method,
		headers: {
			Authorization: 'Bearer ' + token,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
	return await response.json()
}
