import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
	Modal,
	Card,
	CardContent,
	CardActions,
	Divider,
	Button,
} from '@material-ui/core'

import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		outline: 'none',
		boxShadow: theme.shadows[20],
		maxHeight: '100%',
		overflowY: 'auto',
		maxWidth: '100%',
	},
	actions: {
		justifyContent: 'flex-end',
	},
}))

/**
 * Modal dialog ask user to confirm to login
 */
const LoginConfirmDialog = (props) => {
	const classes = useStyles()
	const {
		open, // open dialog
		onClose, // close dialog
		className,
		history,
		...rest
	} = props

	if (!open) {
		return null
	}

	// continue shopping
	const handleShopping = () => {
		log.trace(`[LoginConfirmDialog] continue Shopping`)
		onClose()
	}

	// redirect user to login page
	const handleLogin = () => {
		log.trace(`[LoginConfirmDialog] handleLogin`)
		onClose()
		log.trace(
			`[LoginConfirmDialog] handleLogin after close history=${JSON.stringify(
				history
			)}`
		)
		history.push('/payment')
	}

	return (
		<Modal onClose={onClose} open={open}>
			<Card {...rest} className={clsx(classes.root, className)}>
				<form>
					<CardContent>
						Please login with your social id to proceed to payment. Press
						'Login' to redirect to login page. Press 'Continue Shopping' to
						continue.
					</CardContent>
					<Divider />
					<CardActions>
						<Button color='primary' onClick={handleLogin} variant='contained'>
							Login
						</Button>

						<Button variant='outlined' onClick={handleShopping}>
							Continue Shopping
						</Button>
					</CardActions>
				</form>
			</Card>
		</Modal>
	)
}

LoginConfirmDialog.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool,
}

LoginConfirmDialog.defaultProps = {
	open: false,
	onClose: () => {},
}

export default LoginConfirmDialog
