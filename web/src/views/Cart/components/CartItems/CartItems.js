import React from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	CardContent,
	// Divider,
	Grid,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core'
import ItemEditor from '../ItemEditor'

import _ from 'lodash'
// import cfg from 'config'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},

	hide: {
		display: 'none',
	},
	cardContent: {
		// margin: theme.spacing(1, 1),
		//padding: theme.spacing(2),
		'&:last-child': {
			paddingBottom: theme.spacing(0),
		},
	},
}))

/**
 * CartItems = ItemEditor * n
 */
const CartItems = (props) => {
	//load cart from redux: cart[sku]={quantity, product}
	const { cart, className, ...rest } = props
	const classes = useStyles()

	const items = _.keys(cart).map((k) => cart[k])

	return (
		<Grid container spacing={1}>
			<Grid item md={12} className={classes.hide}>
				<Card {...rest} className={clsx(classes.root, className)}>
					<CardContent className={classes.cardContent}>
						<FormControlLabel
							control={<Checkbox value='checkedB' color='primary' />}
							label='Select all'
						/>
					</CardContent>
				</Card>
			</Grid>

			{items.map((i) => (
				<Grid key={i.product.sku} item md={12}>
					<ItemEditor sku={i.product.sku} />
				</Grid>
			))}
		</Grid>
	)
}

CartItems.propTypes = {
	className: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		cart: state.order.cart,
	}
}

export default connect(mapStateToProps, null)(CartItems)

// export default CartItems
