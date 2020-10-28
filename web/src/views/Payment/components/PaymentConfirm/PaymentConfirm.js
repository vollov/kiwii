import React, { Fragment } from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		height: 295,
	},
}))

const PaymentConfirm = (props) => {
	return (
		<Fragment>
			<Typography variant='h5' gutterBottom>
				Thank you for your order.
			</Typography>
			<Typography variant='subtitle1'>
				Your order number is #2001539. We have emailed your order confirmation,
				and will send you an update when your order has shipped.
			</Typography>
		</Fragment>
	)
}

PaymentConfirm.propTypes = {
	className: PropTypes.string,
}

// const mapStateToProps = (state) => {
// 	return {
// 		cart: state.order.cart,
// 	}
// }

// const f1 = connect(mapStateToProps, null)
//const f2 = injectStripe(OrderSummary)
export default PaymentConfirm
