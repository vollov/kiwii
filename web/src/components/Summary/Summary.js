import React from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	CardContent,
	Divider,
	Typography,
	Grid,
	Button,
} from '@material-ui/core'

// import { connect } from 'react-redux'
// import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {
		height: 295,
	},
	actions: {
		justifyContent: 'space-between',
	},
	button: {
		width: '100%',
	},
	summary: {
		margin: theme.spacing(1, 2),
	},
	top2: {
		marginTop: theme.spacing(2),
	},
	top4: {
		marginTop: theme.spacing(4),
	},
}))

/**
 * Display order total amount
 * @props {object} redux cart[sku]={quantity, product}
 * @props {function} handleOK() handle either buy/placeOrder
 * @props {string} title
 */
const Summary = (props) => {
	const { cart, handleOK, title, className, ...rest } = props
	const classes = useStyles()

	// (subTotal() * 0.13).toFixed(2)

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent className={classes.summary}>
				<Typography variant='h3'>Order Summary</Typography>
				<Grid
					alignItems='center'
					container
					justify='space-between'
					className={classes.top2}
				>
					<Grid item lg={6}>
						<Typography variant='subtitle1'>Subtotal</Typography>
					</Grid>
					<Grid item lg={6}>
						<Typography variant='subtitle1'>$120.45</Typography>
					</Grid>
					<Grid item lg={6}>
						<Typography variant='subtitle1'>Subtotal</Typography>
					</Grid>
					<Grid item lg={6}>
						<Typography variant='subtitle1'>$12.45</Typography>
					</Grid>
				</Grid>
				<Divider className={classes.top2} />

				<Grid
					alignItems='center'
					container
					justify='space-between'
					className={classes.top2}
				>
					<Grid item lg={6}>
						<Typography variant='h4'>Total</Typography>
					</Grid>
					<Grid item lg={6}>
						<Typography variant='h4'>$120.45</Typography>
					</Grid>
					<Grid item lg={12} className={classes.top4}>
						<Button
							variant='contained'
							color='primary'
							size='large'
							className={classes.button}
							onClick={handleOK}
						>
							{title}
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

Summary.propTypes = {
	className: PropTypes.string,
}

// const mapStateToProps = (state) => {
// 	return {
// 		cart: state.order.cart,
// 	}
// }

// const f1 = connect(mapStateToProps, null)
//const f2 = injectStripe(OrderSummary)
export default Summary

//export default injectStripe(OrderSummary)
