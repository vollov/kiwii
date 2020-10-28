import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, Link } from '@material-ui/core'
import PropTypes from 'prop-types'
import axios from 'axios'
import { ProductImage, ProductBox, ProductDescription } from './components'
// import { connect } from 'react-redux'
// import { getProduct } from 'stores/actions/product'
import log from 'libs/log'

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

const ProductDetail = (props) => {
	const { match, history } = props
	const [product, setProduct] = useState(false)

	const classes = useStyles()
	const { sku } = match.params

	log.trace(`[ProductDetail] init history=${JSON.stringify(history)}`)

	useEffect(() => {
		log.trace(`[ProductDetail].useEffect() getProduct(${sku})`)
		axios.get('/products/' + sku).then(({ data }) => {
			log.trace(`[ProductDetail].useEffect() data=${data}`)
			setProduct(data)
		})
	}, [sku])

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Link href='/'>
					<Typography component='h2' gutterBottom variant='overline'>
						Home
					</Typography>
				</Link>
				<Typography component='h1' variant='h3'>
					Product ({product.sku})
				</Typography>
			</div>

			<Grid container spacing={2}>
				<Grid item sm={6} md={5} lg={4}>
					<ProductImage product={product} sku={sku} />
				</Grid>

				<Grid item sm={6} md={7} lg={8}>
					<ProductBox product={product} history={history} />
				</Grid>

				<Grid item sm={12} lg={12}>
					<ProductDescription product={product} />
				</Grid>
			</Grid>
		</div>
	)
}

ProductDetail.propTypes = {
	className: PropTypes.string,
}

export default ProductDetail

// const mapStateToProps = (state) => {
// 	return {
// 		product: state.product.product,
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getProduct: (sku) => dispatch(getProduct(sku)),
// 	}
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
