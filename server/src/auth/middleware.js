import _ from 'lodash'
import jwt from 'jsonwebtoken'

import { AuthError } from '~/src/lib/errors'
import {
	JWT_TOKEN_REQUIRED,
	UNAUTHORIZED // 401
} from '~/src/lib/codes'

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

const whitelist = [
	/\/api\/auth\/google\/login\/*/g,
	/\/api\/products\/*/g
]
// '/api/auth/google/login/*', '/api/auth/facebook/login/*', '/api/products/*'
const authorization = async (req, res, next) => {
	
	const path = req.path

	// public APIs do not require jwt token
	if(req.method == 'GET'){
		if(_.some(whitelist, (x) => x.test(path))){
			log.debug(`authorization, pulbic path=${path}, method=${req.method}`)
			next()
		}
	}
	
	// APIs require jwt token
	// check HTTP header 
	const token = req.get("Authorization")

	// return error if no token
	if (!token) {
		const error = new AuthError(JWT_TOKEN_REQUIRED, UNAUTHORIZED);
		return res.status(UNAUTHORIZED).send(error);
	} 

	// 1) validate token, if expired, send error ask client to logout user 
	// 2) fetch token and compare it with token saved in redis.
	const tokenArray = token.split(" ");
	const jwt_token = tokenArray[1];

	log.debug(`authorization APIs, path=${path}, method=${req.method}, jwt_token=${jwt_token}`)
	try {
		const user = await jwt.verify(jwt_token, cfg.jwt.secret)
		req.user = user
		next()
	} catch (err) {
		// expired and invalid token
		log.error(`authorization token validation err=${err}`)
		const error = new AuthError(JWT_TOKEN_INVALID, UNAUTHORIZED);
		return res.status(UNAUTHORIZED).send(error);
	}
};

export { header, authorization }
