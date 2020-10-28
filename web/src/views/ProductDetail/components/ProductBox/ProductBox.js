import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	CardContent,
	Grid,
	Typography,
	Button,
	Divider,
	Input,
	IconButton,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { red } from '@material-ui/core/colors'
// import _ from 'lodash'
import log from 'libs/log'

import { connect } from 'react-redux'
import { addCartItems } from 'stores/actions/order'
import AddToCart from 'components/AddToCart'
const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	content: {
		alignItems: 'center',
		display: 'flex',
	},
	title: {
		fontWeight: 700,
	},
	top1: {
		marginTop: theme.spacing(1),
	},
	option: {
		marginTop: theme.spacing(1),
		display: 'flex',
	},
	right1: {
		marginRight: theme.spacing(2),
	},
	quantity: {
		width: 30,
	},
	inputCenter: {
		textAlign: 'center',
	},
	specs: {
		marginLeft: theme.spacing(3),
		listStyleType: 'square',
	},
}))

const initialValues = {
	amount: '1',
}
const ProductBox = (props) => {
	const { product, addCartItems, className, history, ...rest } = props
	const [values, setValues] = useState({ ...initialValues })
	const classes = useStyles()

	log.trace(`[ProductBox] init history=${JSON.stringify(history)}`)
	// handle open close AddToCart dialog
	const [open, setOpen] = useState(false)

	/**
	 * display order confirm dialog. persist cart to remote server
	 */
	const handleAddToCart = () => {
		log.trace(
			`handle order amount=${values.amount}, unit price=${product.price}`
		)
		// update cart in local and remote
		const items = [
			{ sku: product.sku, quantity: values.amount, product: product },
		]
		addCartItems(items)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleFieldChange = (e, field, v) => {
		// event.persist();
		// to prevent the default link behavior of opening a new page
		e.preventDefault()
		// pervent expand panel
		e.stopPropagation()
		setValues({ [field]: v })
		log.trace(`[ProductBox] set amount to ${JSON.stringify(values)}`)
	}

	/**
	 * decrease amount in local cache
	 */
	const handleRemove = () => {
		const quantity = values.amount * 1
		if (quantity >= 1) {
			const r = quantity - 1
			setValues({ amount: r })
		}
		// log.trace(`decrease amount to ${JSON.stringify(values)}`)
	}

	/**
	 * increase amount in local cache
	 */
	const handleAdd = () => {
		const quantity = values.amount * 1 + 1
		setValues({ amount: quantity })
		// log.trace(`increase amount to ${JSON.stringify(values)}`)
	}

	/**
	 * display payment page
	 */
	const handleBuy = () => {
		log.trace(`handle buy amount=${values.amount}, unit price=${product.price}`)
		// create order
		// redirect to payment page
		history.push('/cart')
	}

	return product ? (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<Grid container justify='space-between'>
					<Grid item lg={12}>
						<Typography
							className={classes.title}
							// color="textSecondary"
							gutterBottom={true}
							variant='h5'
						>
							{product.name}
						</Typography>

						<Typography className={classes.top1} variant='h4'>
							CAD ${product.price}
						</Typography>
					</Grid>
					<Grid item lg={12}>
						<Divider className={classes.top1} />
						<div className={classes.option}>
							<Typography variant='body1' className={classes.right1}>
								Option:{' '}
							</Typography>
							<Typography variant='body1' color='textSecondary'>
								1700kv 3-6s
							</Typography>
						</div>
						<div className={classes.top1}>
							<Button
								className={classes.right1}
								color='primary'
								size='small'
								variant='outlined'
							>
								1700kv 3-6s
							</Button>
							<Button
								className={classes.right1}
								color='primary'
								size='small'
								variant='outlined'
							>
								1700kv 3-6s
							</Button>
							<Button
								className={classes.right1}
								color='primary'
								size='small'
								variant='outlined'
							>
								1700kv 3-6s
							</Button>
						</div>
					</Grid>

					<Grid item lg={12}>
						<Divider className={classes.top1} />
						<div className={classes.option}>
							<Typography variant='body1' className={classes.right1}>
								Quantity:{' '}
							</Typography>
						</div>
						<div className={classes.top1}>
							<form noValidate autoComplete='off'>
								<IconButton
									size='small'
									aria-label='remove'
									onClick={handleRemove}
								>
									<RemoveIcon />
								</IconButton>
								<Input
									className={classes.quantity}
									inputProps={{ 'aria-label': 'description' }}
									classes={{
										input: classes.inputCenter,
									}}
									onChange={(event) =>
										handleFieldChange(event, 'amount', event.target.value)
									}
									value={values.amount}
								/>
								<IconButton size='small' aria-label='add' onClick={handleAdd}>
									<AddIcon />
								</IconButton>
							</form>

							<div className={classes.top1}>
								<Button
									className={classes.right1}
									color='primary'
									variant='contained'
									onClick={handleBuy}
								>
									Buy Now
								</Button>
								<Button
									className={classes.right1}
									color='primary'
									variant='outlined'
									onClick={handleAddToCart}
								>
									Add To Cart
								</Button>

								<AddToCart
									onClose={handleClose}
									open={open}
									history={history}
								/>
								<Button
									className={classes.right1}
									color='primary'
									variant='outlined'
									startIcon={<FavoriteIcon style={{ color: red[500] }} />}
								>
									111
								</Button>
							</div>
						</div>
					</Grid>
				</Grid>

				<Grid item lg={12}>
					<Divider className={classes.top1} />
					<Typography
						className={clsx(classes.title, classes.top1)}
						// color="textSecondary"
						gutterBottom
						variant='h5'
					>
						Features:
					</Typography>
					<ul className={classes.specs}>
						{Object.keys(product.features).map((key) => (
							<li key={key}>
								<Typography className={classes.top1} variant='body1'>
									{product.features[key]}
								</Typography>
							</li>
						))}
					</ul>
				</Grid>
			</CardContent>
		</Card>
	) : (
		<div>Loading product box...</div>
	)
}

ProductBox.propTypes = {
	className: PropTypes.string,
}

// const mapStateToProps = (state) => {
// 	return {
// 		user: state.auth.user,
// 	}
// }

const mapDispatchToProps = (dispatch) => {
	return {
		addCartItems: (uid, items) => dispatch(addCartItems(uid, items)),
	}
}

export default connect(null, mapDispatchToProps)(ProductBox)

//export default ProductBox
