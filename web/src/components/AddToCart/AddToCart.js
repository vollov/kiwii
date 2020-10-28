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
 * Modal dialog to add shopping cart item
 */
const AddToCart = (props) => {
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
		log.trace(`[AddToCart] handleShopping`)
		onClose()
	}

	// view shopping cart
	const handleViewCart = () => {
		log.trace(`[AddToCart] handleViewCart`)
		onClose()
		log.trace(
			`[AddToCart] handleViewCart after close history=${JSON.stringify(
				history
			)}`
		)
		history.push('/cart')
	}

	return (
		<Modal onClose={onClose} open={open}>
			<Card {...rest} className={clsx(classes.root, className)}>
				<form>
					<CardContent>
						A new item has been added to your Shopping Cart. You now have 3
						items in your Shopping Cart.
					</CardContent>
					<Divider />
					<CardActions>
						<Button
							color='primary'
							onClick={handleViewCart}
							variant='contained'
						>
							View Shopping Cart
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

AddToCart.propTypes = {
	className: PropTypes.string,
	order: PropTypes.any,
	onClose: PropTypes.func,
	open: PropTypes.bool,
}

AddToCart.defaultProps = {
	open: false,
	onClose: () => {},
}

export default AddToCart
