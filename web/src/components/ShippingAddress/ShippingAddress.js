import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Grid, FormControlLabel, Checkbox, colors } from '@material-ui/core'
import log from 'libs/log'
import AddressForm from 'components/AddressForm'

const useStyles = makeStyles((theme) => ({
	root: { margin: theme.spacing(0, 2) },
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

const initialErrors = {
	postcode: '',
	phone: '',
}
/**
 * if user have the default shipping address, load the address card
 * else display address form
 */
const ShippingAddress = (props) => {
	const classes = useStyles()
	const { values, setValues } = props

	const [errors, setErrors] = useState({ ...initialErrors })

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target
		log.trace(`[ShippingAddress] handleChange() field=${name}  value=${value}`)
		// validate input
		switch (name) {
			case 'postcode':
				if (!/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/.test(value)) {
					setErrors({ ...errors, postcode: 'Invalid postcode' })
					log.trace(`set postcode errors`)
				} else {
					log.trace(`unset postcode errors`)
					setErrors({ ...errors, postcode: '' })
				}
				break
			default:
				break
		}

		event.persist()
		setValues({
			...values,
			[name]: type === 'checkbox' ? checked : value.toUpperCase(),
		})
	}

	return (
		<form className={classes.root}>
			<Grid container spacing={4}>
				{/* address form */}

				<AddressForm
					values={values}
					errors={errors}
					handleChange={handleChange}
				/>
				<Grid item md={12} xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								name='default'
								color='primary'
								checked={values.default}
								onChange={handleChange}
							/>
						}
						label='set as default'
					/>
				</Grid>
			</Grid>
		</form>
	)
}

ShippingAddress.propTypes = {
	className: PropTypes.string,
}

export default ShippingAddress

// const mapStateToProps = (state) => {
// 	return {
// 		shippingAddress: state.payment.shippingAddress,
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		saveAddress: (address) => dispatch(saveAddress(address)),
// 	}
// }

// export default connect(null, mapDispatchToProps)(ShippingAddress)
