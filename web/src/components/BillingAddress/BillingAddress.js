import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Grid, FormControlLabel, Checkbox, colors } from '@material-ui/core'
import log from 'libs/log'
import AddressForm from 'components/AddressForm'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
	root: { margin: theme.spacing(0, 4) },
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
 *  user click use same address to populate the fields
 *  user click save to click save
 */
const BillingAddress = (props) => {
	const classes = useStyles()
	const { values, setValues, shippingAddress } = props

	const [errors, setErrors] = useState({ ...initialErrors })

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target
		log.trace(`[BillingAddress] handleChange() field=${name}  value=${value}`)

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

	const useShippingAddress = (event) => {
		if (event.target.checked) {
			// populate the values with shipping address
			_.unset(shippingAddress, '_id')
			log.trace(
				`[BillingAddress] useShippingAddress() checked, shippingAddress=${JSON.stringify(
					shippingAddress
				)}`
			)
			setValues({
				...shippingAddress,
				default: false,
			})
		}
	}

	return (
		<form className={classes.root}>
			<Grid container spacing={4}>
				<Grid item md={12} xs={12}>
					<FormControlLabel
						control={<Checkbox color='primary' onChange={useShippingAddress} />}
						label='my billing address is the same as my shipping address'
					/>
				</Grid>

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

BillingAddress.propTypes = {
	className: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		shippingAddress: state.payment.shippingAddress,
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		saveAddress: (address) => dispatch(saveAddress(address)),
// 	}
// }

export default connect(mapStateToProps, null)(BillingAddress)
