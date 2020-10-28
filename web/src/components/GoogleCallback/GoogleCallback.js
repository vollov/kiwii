import React, { useEffect, Fragment } from 'react'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import cfg from 'config'
import log from 'libs/log'

import { googleLogin, authState } from 'stores/actions/auth'

/**
 * send access_token to REST_HOST/google/login,
 * store user in local and redirect to /home
 */
const GoogleCallback = (props) => {
	const { googleLogin, status, location } = props
	const values = queryString.parse(location.hash)
	const from = JSON.parse(values.state)
	log.trace(`[GoogleCallback], path from=${values.state}`)

	useEffect(() => {
		// request facebbok/login/:access_token 
		// write jwt token and user into redux
		googleLogin(values.access_token)
	})

	if (status === authState.LOGIN) {
		return <Redirect to={from} />
	} else {
		
		return (
			<Fragment>
				<div>Google Callback Error :(</div>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.auth.status,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		googleLogin: (token) => dispatch(googleLogin(token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleCallback)
