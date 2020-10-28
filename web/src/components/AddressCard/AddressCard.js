import React from 'react'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(0, 4),
	},
}))

const AddressCard = (props) => {
	const classes = useStyles()
	const { address, className } = props

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item md={6} xs={6}>
					<Typography variant='h3'>
						{`${address.firstName} ${address.lastName}`.toUpperCase()}
					</Typography>
				</Grid>
				<Grid item md={6} xs={6}>
					<Typography variant='body1'>Tel: {address.phone}</Typography>
				</Grid>
				<Grid item md={12} xs={12}>
					<Typography variant='body1'>
						{address.street.toUpperCase()}
					</Typography>
				</Grid>
				<Grid item md={12} xs={12}>
					<Typography variant='body1'>
						{`${address.city.toUpperCase()}, ${address.province.toUpperCase()}, ${
							address.postcode
						}`}
					</Typography>
				</Grid>
			</Grid>
		</div>
	)
}

AddressCard.propTypes = {
	className: PropTypes.string,
}

export default AddressCard
