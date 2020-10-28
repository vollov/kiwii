import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import cfg from "config";
const RouteWithLayout = props => {
	const { layout: Layout, component: Component, ...rest } = props;

	// if local storage have no token, return false
	const token = localStorage.getItem(cfg.constant.AUTH_TOKEN);
	let user = null;
	if (token) {
		user = JSON.parse(localStorage.getItem(cfg.constant.AUTH_USER));
	}

	return (
		<Route
			{...rest}
			render={matchProps => (
				<Layout currentUser={user}>
					<Component currentUser={user} {...matchProps} />
				</Layout>
			)}
		/>
	);
};

RouteWithLayout.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
	path: PropTypes.string
};

export default RouteWithLayout;
