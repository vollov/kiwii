import React from 'react'
import { Fab, Button, IconButton, Badge, colors } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InputIcon from '@material-ui/icons/Input'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import cfg from 'config'
// import log from 'libs/log'

import { logout } from 'stores/actions/auth'

const useStyles = makeStyles((theme) => ({
	button: {
		padding: theme.spacing(1, 2),
		marginRight: theme.spacing(2),
		color: theme.palette.common.white,
		backgroundColor: colors.green[600],
		'&:hover': {
			backgroundColor: colors.green[900],
		},
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	fab: {
		color: theme.palette.common.white,
		backgroundColor: colors.red[600],
		'&:hover': {
			backgroundColor: colors.red[900],
		},
	},
	logoutButton: {
		marginLeft: theme.spacing(1),
	},
	logoutIcon: {
		marginRight: theme.spacing(1),
	},
}))

const Authbar = (props) => {
	const { logout, cart, history, currentUser, itemsTotal } = props
	const classes = useStyles()
	// logout if user is empty
	let nickname = null
	if (currentUser) {
		const { firstName, lastName } = currentUser
		if (firstName && lastName) {
			nickname = firstName[0] + lastName[0]
		}
	}

	const isCartEmpty = cart == null || Object.keys(cart).length === 0

	const handleLogout = () => {
		logout()
		history.push('/')
	}

	const handleCart = () => {
		history.push('/cart')
	}

	return (
		<div>
			{!currentUser && (
				<Button href='/login' className={classes.button}>
					Signin
				</Button>
			)}

			{currentUser && (
				<Button onClick={handleLogout} className={classes.button}>
					<InputIcon className={classes.logoutIcon} />
					Logout
				</Button>
			)}

			{/* <IconButton className={classes.chatButton} color='inherit'>
				<Badge badgeContent={6} color='secondary'>
					<PeopleIcon />
				</Badge>
			</IconButton> */}

			{/* display cart icon when cart is not empty, compute the cart items */}
			{!isCartEmpty && (
				<IconButton
					className={classes.menuButton}
					color='inherit'
					onClick={handleCart}
				>
					<Badge badgeContent={itemsTotal} color='secondary'>
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
			)}

			{nickname && (
				<Fab size='small' className={classes.fab}>
					{nickname}
				</Fab>
			)}
		</div>
	)
}

Authbar.propTypes = {
	history: PropTypes.object,
}

const mapStateToProps = (state) => {
	return {
		cart: state.order.cart,
		itemsTotal: state.order.itemsTotal,
		currentUser: state.auth.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logout()),
	}
}

const f1 = connect(mapStateToProps, mapDispatchToProps)
const f2 = withRouter
export default f1(f2(Authbar))
