import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	CardActionArea,
	CardMedia,
	CardActions,
	Grid,
} from '@material-ui/core'
import cfg from 'config'
// import log from 'libs/log'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
	root: {
		// height: "100%"
	},
	content: {
		// display: flex;
		// justify-content: center;

		alignItems: 'center',
		display: 'flex',
	},
	card: {
		maxWidth: 345,
	},
	media: {
		[theme.breakpoints.down('sm')]: {
			width: 350,
		},
		[theme.breakpoints.up('md')]: {
			width: '100%',
		},
		//border: "1px solid black",
		height: 'auto',
	},
	thumb: {
		//border: "1px solid black",
		width: 60,
		height: 'auto',
		// marginRight: theme.spacing(1),
	},
	image: {
		display: 'flex',
		alignItems: 'center',
	},
}))

const ProductImage = (props) => {
	const { product, sku, className, ...rest } = props

	const classes = useStyles()

	const [currentImage, setCurrentImage] = useState()

	useEffect(() => {
		axios.get('/products/image/' + sku).then(({ data }) => {
			setCurrentImage(cfg.app.MEDIA_URL + data.path)
		})
	}, [sku])

	if (product) {
		return (
			<Card {...rest} className={clsx(classes.root, className)}>
				<CardActionArea>
					<CardMedia title={product.name}>
						<img src={currentImage} className={classes.media} alt='product'/>
					</CardMedia>
				</CardActionArea>
				<CardActions>
					<Grid
						container
						className={classes.content}
						justify='center'
						spacing={1}
					>
						{product.images.map((image) => (
							<Grid key={image.name} className={classes.image} item>
								<img
									src={cfg.app.MEDIA_URL + image.thumbs}
									className={classes.thumb}
									alt='product'
									onClick={() => {
										setCurrentImage(cfg.app.MEDIA_URL + image.path)
									}}
								/>
							</Grid>
						))}
					</Grid>
				</CardActions>
			</Card>
		)
	} else {
		return <div>Loading product images...</div>
	}
}

ProductImage.propTypes = {
	className: PropTypes.string,
}

export default ProductImage
