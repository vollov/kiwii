import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import log from 'libs/log'
import { authState } from 'stores/actions/auth'

/**
 * - if jwt token is not in local store, user is not authenticated.
 * - if jwt token is in local store, user is authenticated.
 * - redirect url to login view, if user is not authenticated.
 */
const PrivateRoute = (props) => {
	const { user, status, layout: Layout, component: Component, ...rest } = props

	log.debug(`PrivateRoute props=${JSON.stringify(props)}`)
	log.debug(`PrivateRoute pathname=${props.location.pathname}`)

	// redirect to page trying to load
	if (status === authState.LOGIN) {
		return (
			<Route
				{...rest}
				render={(matchProps) => {
					log.trace(`[PrivateRoute] matchProps=${JSON.stringify(matchProps)}`)
					return (
						<Layout currentUser={user}>
							<Component currentUser={user} {...matchProps} />
						</Layout>
					)
				}}
			/>
		)
	} else {
		// redirect to login
		return (
			<Route
				{...rest}
				render={(matchProps) => {
					log.trace(
						`PrivateRoute redirect matchProps=${JSON.stringify(matchProps)}`
					)
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: matchProps.location },
							}}
						/>
					)
				}}
			/>
		)
	}
}

PrivateRoute.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
	path: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		status: state.auth.status,
		user: state.auth.user,
	}
}

export default connect(mapStateToProps, null)(PrivateRoute)
