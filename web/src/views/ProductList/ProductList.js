import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Grid, Divider, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ChevronRight, ChevronLeft } from '@material-ui/icons'
import { ProductCard } from './components'
import { listProduct } from 'stores/actions/product'
import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
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

const ProductList = (props) => {
	log.trace(`[ProductList] loading, props=${JSON.stringify(props)}`)
	const classes = useStyles()
	const { listProduct, products, history } = props

	useEffect(() => {
		listProduct()
		log.trace(`[ProductList].useEffect, loaded products....`)
	}, [listProduct])

	return products ? (
		<div className={classes.root}>
			{/* <ProductsToolbar /> */}

			<div className={classes.title}>
				<Typography variant='h3'>Featured Products</Typography>
				<Divider />
			</div>
			<div className={classes.content}>
				<Grid container spacing={1}>
					<Grid item>
						<Grid container spacing={2}>
							{products.map((product) => (
								<Grid item key={product._id} lg={4} md={6} xs={12}>
									<ProductCard product={product} history={history} />
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</div>
			<div className={classes.pagination}>
				<Typography variant='caption'>1-6 of 20</Typography>
				<IconButton>
					<ChevronLeft />
				</IconButton>
				<IconButton>
					<ChevronRight />
				</IconButton>
			</div>
		</div>
	) : (
		<div>Loading...</div>
	)
}

ProductList.propTypes = {
	className: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		products: state.product.products,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		listProduct: () => dispatch(listProduct()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
