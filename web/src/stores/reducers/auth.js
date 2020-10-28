import {
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	authState,
	LOGOUT_ERROR,
} from 'stores/actions/auth'

import log from 'libs/log'

const initState = {
	status: authState.LOGOUT,
	user: {
		firstName: null,
		lastName: null,
		email: null,
	},
	jwtToken: null,
}

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const { user, token } = action.data
			log.trace(`authReducer::LOGIN_SUCCESS, user =${JSON.stringify(user)}`)
			return {
				...state,
				status: authState.LOGIN,
				user: user,
				jwtToken: token,
			}
		case LOGOUT_SUCCESS:
			log.trace('authReducer::LOGOUT_SUCCESS')
			return {
				...state,
				status: authState.LOGOUT,
				user: null,
				jwtToken: null,
			}
		case LOGOUT_ERROR:
			// TODO: log the error into report system
			log.error(action.err)
			log.trace('authReducer::LOGOUT_ERROR')

			return {
				...state,
				status: authState.LOGOUT,
				user: null,
				jwtToken: null,
			}
		default:
			return state
	}
}

export default authReducer
