import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import TextTruncate from 'react-text-truncate'

import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Grid,
	Button,
	Divider,
	CardMedia,
} from '@material-ui/core'
import log from 'libs/log'
import cfg from 'config'
import { connect } from 'react-redux'
import { addCartItems } from 'stores/actions/order'
import AddToCart from 'components/AddToCart'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	image: {
		// border: "1px solid black",
		height: 'auto',
		width: '100%',
	},
	statsItem: {
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		marginTop: theme.spacing(1),
	},
}))

const ProductCard = (props) => {
	const { product, addCartItems, className, history, ...rest } = props

	// handle open close AddToCart dialog
	const [open, setOpen] = useState(false)

	/**
	 * display order confirm dialog. persist cart to remote server
	 */
	const handleAddToCart = () => {
		log.trace(`handle order amount=1, unit price=${product.price}`)
		// update cart in local and remote
		const items = [{ sku: product.sku, quantity: 1, product: product }]
		addCartItems(items)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const classes = useStyles()
	const detailUrl = '/product-detail/' + product.sku

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardMedia title={product.name}>
				<a href={detailUrl}>
					<img
						src={cfg.app.MEDIA_URL + product.imageUrl}
						className={classes.image}
						alt='product'
					/>
				</a>
			</CardMedia>
			<CardContent>
				<a href={detailUrl}>
					<Typography component={'span'} align='left' variant='h6'>
						<TextTruncate line={2} truncateText='...' text={product.name} />
					</Typography>
				</a>
				<Grid container justify='space-between' className={classes.title}>
					<Grid item>
						<Typography variant='h5'>CAD ${product.price}</Typography>
					</Grid>
					<Grid item>
						<Typography variant='body1'>SKU: {product.sku}</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<Divider />
			<CardActions>
				<Grid container justify='space-between'>
					<Grid className={classes.statsItem} item>
						<Button color='primary' variant='outlined'>
							Like
						</Button>
					</Grid>
					<Grid className={classes.statsItem} item>
						<Button
							color='primary'
							variant='contained'
							onClick={handleAddToCart}
						>
							Add to cart
						</Button>
						<AddToCart onClose={handleClose} open={open} history={history} />
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	)
}

ProductCard.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
}

//export default ProductCard;
const mapDispatchToProps = (dispatch) => {
	return {
		addCartItems: (uid, items) => dispatch(addCartItems(uid, items)),
	}
}

export default connect(null, mapDispatchToProps)(ProductCard)
