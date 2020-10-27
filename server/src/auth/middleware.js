import _ from 'lodash'

import { AuthError } from '~/src/lib/errors'
import {
	JWT_TOKEN_REQUIRED,
	UNAUTHORIZED,
	SERVER_ERROR
} from '~/src/lib/constants'

import {verifyToken} from '~/src/auth/service'

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

// const regex = /[A-Z]/g;
const whitelist = [
	/\/api\/auth\/google\/login\/*/g,
	RegExp('/api/product/*'),
	/\/api\/products\/*/g
]
// '/api/auth/google/login/*', '/api/auth/facebook/login/*', '/api/products/*'
const authorization = async (req, res, next) => {
	
	const path = req.path

	if(req.method == 'GET'){
		if(_.some(whitelist, (x) => x.test(path))){
			console.log(`authorization, pulbic path=${path}, method=${req.method}`)
		} else {
			// check HTTP header 
			
			const token = req.get("Authorization")

			// return error if no token
			if (!token) {
				const error = new AuthError(JWT_TOKEN_REQUIRED, UNAUTHORIZED);
				return res.status(error.statusCode).send(error);
			} 

			const tokenArray = token.split(" ");
			const jwt = tokenArray[1];

			// verify token
			console.log(`authorization, path=${path}, jwt=${jwt}`)
			next()
			// try {
			// 	const email = await verifyToken(jwt);
			// 	req.email = email;
			// 	next();
			// } catch (err) {
			// 	log.error(`Validate JWT token error= ${err}`)
			// 	const error = new ServerError(JWT_TOKEN_INVALID, SERVER_ERROR)
			// 	return res.status(error.statusCode).send(error);
			// }
		}
	}
	
	next()







};

export { header, authorization }
