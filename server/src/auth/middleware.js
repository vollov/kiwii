import _ from 'lodash'
import jwt from 'jsonwebtoken'
import log from '../lib/logger'
import { AuthError } from '../lib/errors'
import {
	JWT_TOKEN_REQUIRED,
	JWT_TOKEN_INVALID,
	UNAUTHORIZED, // 401
} from '../lib/codes'
import cfg from '../config'
import { publicAPI } from '../lib/utils'

const header = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')

	res.header('Content-Type', 'application/json; charset=utf-8')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.header(
		'Access-Control-Allow-Methods',
		'HEAD, GET, POST, PUT, DELETE, OPTIONS'
	)
	next()
}

const authorization = async (req, res, next) => {
	const path = req.originalUrl
	const method = req.method
	log.debug(`authorization, path=>>>>${path}, method=${method}`)

	// public APIs do not require jwt token
	if (publicAPI(method, path)) {
		log.debug(`authorization, pulbic path=${path}, method=${req.method}`)
		next()
	} else {
		// APIs require jwt token
		// check HTTP header
		const token = req.get('Authorization')

		// return error if no token
		if (!token) {
			log.debug(`get token=${token}`)
			const error = new AuthError(JWT_TOKEN_REQUIRED, UNAUTHORIZED)
			return res.status(UNAUTHORIZED).json(error)
		} else {
			// 1) validate token, if expired, send error ask client to logout user
			// 2) fetch token and compare it with token saved in redis.
			const tokenArray = token.split(' ')
			const jwt_token = tokenArray[1]

			log.debug(
				`authorization APIs validate jwt_token=${jwt_token}, path=${path}, method=${req.method}`
			)

			try {
				const user = await jwt.verify(jwt_token, cfg.jwt.secret)
				log.debug(
					`authorization() success, user=${user}, req.body=${JSON.stringify(
						req.body
					)}`
				)
				req.user = user
				next()
			} catch (err) {
				// expired and invalid token
				log.error(`authorization token validation err=${err}`)
				const error = new AuthError(JWT_TOKEN_INVALID, UNAUTHORIZED)
				return res.status(UNAUTHORIZED).send(error)
			}
		}
	}
}

export { header, authorization }
