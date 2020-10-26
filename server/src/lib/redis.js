import Redis from 'ioredis'
import cfg from '~/src/config'

const redis = new Redis({ password: cfg.redis.secret })

const set = (key, value) => {
	return redis.set(key, value)
}

const remove = (key) => {
	return redis.del(key)
}

const get = (key) => {
	return redis.get(key)
}

const exists = (key) => {
	return redis.exists(key)
}

/**
 *
 * @param {string} key
 * @param {number} seconds
 */
const expire = (key, seconds) => {
	return redis.expire(key, seconds)
}

const disconnect = () => {
	redis.disconnect()
}

//export { set, get, exists, disconnect, expire, remove };
export default redis
