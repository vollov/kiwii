import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	// InputLabel,
	MenuItem,
	Grid,
	TextField,
	// Select,
	colors,
} from '@material-ui/core'
// import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
	root: {},
	saveButton: {
		color: theme.palette.common.white,
		backgroundColor: colors.green[600],
		'&:hover': {
			backgroundColor: colors.green[900],
		},
	},
	form: {
		marginBottom: theme.spacing(2),
	},
	show: {
		display: 'inline',
	},
	hide: {
		display: 'none',
	},
}))

const provinces = [
	'ON',
	'QC',
	'BC',
	'NL',
	'PE',
	'NS',
	'NB',
	'MB',
	'SK',
	'AB',
	'YT',
	'NT',
	'NU',
]
const AddressForm = (props) => {
	// const classes = useStyles()
	const { errors, values, handleChange } = props

	return (
		<Fragment>
			<Grid item md={6} xs={12}>
				<TextField
					fullWidth
					label='First name'
					name='firstName'
					onChange={handleChange}
					required
					value={values.firstName}
					variant='outlined'
				/>
			</Grid>
			<Grid item md={6} xs={12}>
				<TextField
					fullWidth
					label='Last name'
					name='lastName'
					onChange={handleChange}
					required
					value={values.lastName}
					variant='outlined'
				/>
			</Grid>

			<Grid item md={9} xs={12}>
				<TextField
					fullWidth
					label='Street'
					name='street'
					required
					onChange={handleChange}
					value={values.street}
					variant='outlined'
				/>
			</Grid>

			<Grid item md={3} xs={6}>
				<TextField
					fullWidth
					label='Apt/Unit'
					name='unit'
					onChange={handleChange}
					value={values.unit}
					variant='outlined'
				/>
			</Grid>

			<Grid item md={6} xs={6}>
				<TextField
					fullWidth
					label='City'
					name='city'
					onChange={handleChange}
					value={values.city}
					variant='outlined'
				/>
			</Grid>

			<Grid item md={3} xs={6}>
				{/* <Autocomplete
					fullWidth
					required
					options={provinces}
					getOptionLabel={(option) => option}
					renderInput={(params) => (
						<TextField
							{...params}
							onChange={handleChange}
							placeholder='ON'
							value={values.Province}
							label='Province'
							variant='outlined'
						/>
					)}
				/> */}

				<TextField
					fullWidth
					select
					label='Province'
					name='province'
					onChange={handleChange}
					value={values.province}
					variant='outlined'
				>
					{provinces.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</Grid>

			<Grid item md={3} xs={6}>
				<TextField
					fullWidth
					label='postcode'
					name='postcode'
					onChange={handleChange}
					required
					// error
					//{errors.postcode===''? '': error}
					helperText={errors.postcode === '' ? '' : 'Invalid postcode'}
					placeholder='N2N1N3'
					value={values.postcode}
					variant='outlined'
				/>
			</Grid>
			<Grid item md={6} xs={12}>
				<TextField
					fullWidth
					label='Phone'
					name='phone'
					onChange={handleChange}
					required
					value={values.phone}
					variant='outlined'
				/>
			</Grid>
		</Fragment>
	)
}

AddressForm.propTypes = {
	className: PropTypes.string,
}

export default AddressForm
