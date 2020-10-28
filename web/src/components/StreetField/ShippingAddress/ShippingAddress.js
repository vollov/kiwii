import React, { useState, useEffect, Fragment } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Divider,
	FormControlLabel,
	Checkbox,
	colors,
} from '@material-ui/core'
import axios from 'axios'
import log from './node_modules/libs/log'
import AddressForm from './node_modules/components/AddressForm'

import { saveAddress } from './node_modules/stores/actions/payment'

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

const initialValues = {
	firstName: '',
	lastName: '',
	phone: '',
	street: '',
	city: '',
	province: '',
	unit: '',
	postcode: '',
	default: false,
}

/**
 * if user have the default shipping address, load the address card
 * else display address form
 */
const ShippingAddress = (props) => {
	const classes = useStyles()
	const { saveAddress, className, ...rest } = props

	const [values, setValues] = useState({ ...initialValues })

	const handleChange = (event) => {
		// e.preventDefault();
		// e.stopPropagation();
		log.trace(`change field=${event.target.name}  value=${event.target.value}`)
		event.persist()
		setValues({
			...values,
			[event.target.name]:
				event.target.type === 'checkbox'
					? event.target.checked
					: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		log.trace(
			`[ShippingAddress].handleSubmit(), values=${JSON.stringify(values)}`
		)

		const address = { ...values, type: 'S' }
		// save shipping address

		log.trace(
			`[ShippingAddress].handleSubmit(), saveAddress =${JSON.stringify(
				address
			)}`
		)
		saveAddress(address)
		// reload the component to address card
	}

	return (
		<Card {...rest} className={clsx(classes.root, classes.form)}>
			<form onSubmit={handleSubmit}>
				<CardHeader title='Shipping Address' />
				<Divider />
				<CardContent>
					<Grid container spacing={4}>
						{/* address form */}

						<AddressForm values={values} handleChange={handleChange} />
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
				</CardContent>

				<Divider />
				<CardActions>
					<Button
						className={classes.saveButton}
						type='submit'
						variant='contained'
					>
						Confirm
					</Button>
				</CardActions>
			</form>
		</Card>
	)
}

ShippingAddress.propTypes = {
	className: PropTypes.string,
}

// const mapStateToProps = (state) => {
// 	return {
// 		shippingAddress: state.payment.shippingAddress,
// 	}
// }

const mapDispatchToProps = (dispatch) => {
	return {
		saveAddress: (address) => dispatch(saveAddress(address)),
	}
}

export default connect(null, mapDispatchToProps)(ShippingAddress)

// export default ShippingAddress
