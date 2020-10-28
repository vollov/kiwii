import React, { useState } from 'react'

// import axios from 'axios'
import { connect } from 'react-redux'
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

import { authState } from 'stores/actions/auth'

import log from 'libs/log'

import LoginConfirmDialog from 'components/LoginConfirmDialog'

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

const OrderSummary = (props) => {
	const { stripe, subTotal, history, loginState, className, ...rest } = props
	const classes = useStyles()

	// handle open close Login confirm dialog
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	// if user not logged in, display dialog to redirect to log in page
	const handlePay = () => {
		if (loginState !== authState.LOGIN) {
			setOpen(true)
		} else {
			history.push('/payment')
		}
	}

	return (
		<Card className={clsx(classes.root, className)}>
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
						<Typography variant='subtitle1'>${subTotal}</Typography>
					</Grid>
					<Grid item lg={6}>
						<Typography variant='subtitle1'>Tax</Typography>
					</Grid>
					<Grid item lg={6}>
						<Typography variant='subtitle1'>
							${(subTotal * 0.13).toFixed(2)}
						</Typography>
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
						<Typography variant='h4'>
							${(subTotal * 1.13).toFixed(2)}
						</Typography>
					</Grid>
					<Grid item lg={12} className={classes.top4}>
						<Button
							variant='contained'
							color='primary'
							size='large'
							className={classes.button}
							onClick={handlePay}
						>
							Buy
						</Button>

						<LoginConfirmDialog
							onClose={handleClose} // continue shopping
							open={open}
							history={history}
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

OrderSummary.propTypes = {
	className: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		subTotal: state.order.subTotal,
		loginState: state.auth.status,
	}
}

const f1 = connect(mapStateToProps, null)
//const f2 = injectStripe
export default f1(OrderSummary)

//export default injectStripe(OrderSummary)
