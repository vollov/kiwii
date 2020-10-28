import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	colors,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Button,
	Input,
	IconButton,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { connect } from 'react-redux'
import log from 'libs/log'
import cfg from 'config'
import { setQuantity, removeCartItems } from 'stores/actions/order'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	itemCard: {
		display: 'flex',
	},
	hide: {
		display: 'none',
	},
	itemContent: {
		// margin: theme.spacing(1, 1),
		//padding: theme.spacing(2),
		'&:last-child': {
			paddingBottom: theme.spacing(2),
		},
	},
	top2: {
		marginTop: theme.spacing(2),
	},
	top4: {
		marginTop: theme.spacing(4),
	},
	cover: {
		margin: theme.spacing(1, 1),
		// width: 200,
	},
	image: {
		// border: '1px solid black',
		height: 'auto',
		width: '100%',
	},
	option: {
		marginTop: theme.spacing(2),
		display: 'flex',
	},
	button: {
		margin: theme.spacing(1),
	},
	quantity: {
		marginTop: theme.spacing(1.5),
	},
	inputCenter: {
		textAlign: 'center',
	},
	right: {
		justifyContent: 'flex-end',
	},
	flexGrow: {
		flexGrow: 1,
	},
	colorDanger: {
		color: theme.palette.common.white,
		backgroundColor: colors.red[600],
		'&:hover': {
			backgroundColor: colors.red[900],
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				backgroundColor: colors.red[600],
			},
		},
	},
}))

/**
 * props = {sku}
 * cart[sku]={quantity, product}
 */
const ItemEditor = (props) => {
	const classes = useStyles()
	const {
		sku,
		cart,
		setQuantity,
		removeCartItems,
		className,
		...rest
	} = props

	const [values, setValues] = useState({ quantity: cart[sku].quantity })

	/**
	 * decrease cart[sku].quantity
	 */
	const decrease = () => {
		const q = cart[sku].quantity * 1
		if (q >= 1) {
			setValues({quantity:q - 1})
			// update redux
			setQuantity(sku, q - 1)
		}
	}

	/**
	 * increase cart[sku].quantity
	 */
	const increase = () => {
		const q = cart[sku].quantity * 1 + 1
		setValues({quantity:q})
		setQuantity(sku, q)
	}

	const handleRemoveFromCart = () => {
		// confirm dialog before remove
		setOpen(true)
	}

	/**
	 * goal delete states and events
	 */
	const [open, setOpen] = React.useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	const handleOK = () => {
		const skus = [sku]
		removeCartItems(skus)
		setOpen(false)
	}

	return (
		<Card {...rest} className={clsx(classes.itemCard, className)}>
			<Checkbox value='checkedB' color='primary' className={classes.hide} />
			<CardMedia className={classes.cover} title='Live from space album cover'>
				<a href={`/product-detail/${sku}`}>
					<img
						alt='Live from space album cover'
						src={cfg.app.MEDIA_URL + cart[sku].product.imageUrl}
						className={classes.image}
					/>
				</a>
			</CardMedia>
			<CardContent className={classes.itemContent}>
				<Grid container justify='space-between'>
					<Grid item lg={12}>
						<a href={`/product-detail/${sku}`}>
							<Typography className={classes.title} variant='h6'>
								{cart[sku].product.name}
							</Typography>
						</a>

						<div className={classes.option}>
							<Typography variant='body1' className={classes.right1}>
								Option:{' '}
							</Typography>
							<Typography variant='body1' color='textSecondary'>
								1700kv 3-6s
							</Typography>

							<div className={classes.flexGrow} />

							<IconButton
								className={classes.button}
								size='small'
								aria-label='remove'
								onClick={decrease}
							>
								<RemoveIcon />
							</IconButton>
							<Typography variant='h5' className={classes.quantity}>
								{values.quantity}
							</Typography>
							<IconButton
								className={classes.button}
								size='small'
								aria-label='add'
								onClick={increase}
							>
								<AddIcon />
							</IconButton>
						</div>

						<div className={classes.option}>
							<Typography variant='h5'>
								CAD ${(values.quantity * cart[sku].product.price).toFixed(2)}
							</Typography>
							<div className={classes.flexGrow} />
							<Button
								variant='contained'
								size='small'
								className={clsx(classes.colorDanger, classes.button)}
								onClick={handleRemoveFromCart}
							>
								Remove
							</Button>
						</div>

						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby='alert-dialog-title'
							aria-describedby='alert-dialog-description'
						>
							<DialogTitle id='alert-dialog-title'>
								Delete Confirmation
							</DialogTitle>
							<DialogContent>
								<DialogContentText id='alert-dialog-description'>
									{`Press OK to confirm delete. Click Cancel to close this window.`}
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color='primary'>
									Cancel
								</Button>
								<Button onClick={handleOK} color='primary' autoFocus>
									OK
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

ItemEditor.propTypes = {
	className: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		cart: state.order.cart,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setQuantity: (sku, quantity) => dispatch(setQuantity(sku, quantity)),
		removeCartItems: (skus) => dispatch(removeCartItems(skus)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditor)

