import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Link, Typography } from '@material-ui/core'
import { OrderSummary, CartItems } from './components'

import PropTypes from 'prop-types'
// import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
	},
	title: {
		marginTop: theme.spacing(1),
	},
	content: {
		marginTop: theme.spacing(2),
	},
	pagination: {
		marginTop: theme.spacing(3),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
}))

/**
 * Cart = CartItems + OrderSummary
 */
const Cart = (props) => {
	const classes = useStyles()

	const { history } = props

	// const [cart, setCart] = useState(mCart)

	// useEffect(() => {
	// 	log.trace(`[Cart].useEffect() mCart updated => ${JSON.stringify(mCart)})`)
	// 	setCart(mCart)
	// }, [mCart])

	//load cart from redux: cart[sku]={quantity, product}
	return (
		<div className={classes.root}>
			
			<div className={classes.title}>
				<Link href='/'>
					<Typography component='h2' gutterBottom variant='overline'>
						Home
					</Typography>
				</Link>
				<Typography component='h1' variant='h3'>
					Shopping Cart
				</Typography>
			</div>

			<Grid className={classes.title} container spacing={2}>
				<Grid item sm={7} md={8} lg={8} xl={8}>
					<CartItems/>
				</Grid>

				<Grid item sm={4} md={3} lg={4} xl={4}>
					<OrderSummary history={history} />
				</Grid>
			</Grid>
		</div>
	)
}

Cart.propTypes = {
	className: PropTypes.string,
}

export default Cart

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		addCartItems: (uid, items) => dispatch(addCartItems(uid, items)),
// 	}
// }
// export default Cart
