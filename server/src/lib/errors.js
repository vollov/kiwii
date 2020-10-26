import { UNAUTHORIZED, BAD_REQUEST } from './codes'

export class ValidationError extends Error {
	constructor(code) {
		super(code)
		this.code = code
		this.statusCode = BAD_REQUEST
	}
}

export class JwtError extends Error {
	constructor(code) {
		super(code)
		this.code = code
		this.statusCode = UNAUTHORIZED
	}
}

export class AuthError extends Error {
	constructor(code, httpStatus) {
		super(code)
		this.code = code
		this.statusCode = httpStatus
	}
}

export class ServerError extends Error {
	constructor(code, httpStatus) {
		super(code)
		this.code = code
		this.statusCode = httpStatus
	}
}
