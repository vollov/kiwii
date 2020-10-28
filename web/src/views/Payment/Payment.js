import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
	Grid,
	Link,
	Typography,
	Stepper,
	Step,
	StepLabel,
	Button,
	Paper,
} from '@material-ui/core'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import log from 'libs/log'
import { ShippingAddress, BillingAddress, AddressCard } from 'components'
import {
	getBillingAddress,
	getShippingAddress,
	saveAddress,
} from 'stores/actions/payment'

import { PaymentConfirm, PaymentReview, CartSummary } from './components'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
	},
	title: {
		marginTop: theme.spacing(1),
	},
	content: {
		margin: theme.spacing(2),
	},
	stepper: {
		margin: theme.spacing(0, 2),
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}))

// initial values of address
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

const steps = ['Shipping address', 'Billing address', 'Payment Detail']

/**
 * Payment = Steeper container to process payments
 * Shipping Address > Billing Address > Charger
 */
const Payment = (props) => {
	const classes = useStyles()

	const {
		shippingAddress,
		billingAddress,
		getShippingAddress,
		getBillingAddress,
		saveAddress,
	} = props
	const [values, setValues] = useState({ ...initialValues })

	const [activeStep, setActiveStep] = React.useState(0)

	const handleNext = () => {
		let address = { ...values }
		switch (activeStep) {
			case 0:
				address.type = 'S'
				saveAddress(address)
				// clear values
				setValues({ ...initialValues })
				break
			case 1:
				address.type = 'B'
				saveAddress(address)
				setValues({ ...initialValues })
				break
			case 2:
				log.trace(`Processing credit card`)
				break

			default:
				break
		}
		// TODO: go to next when success
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	const getStepView = (step) => {
		switch (step) {
			case 0:
				// show AddressCard if shippingAddress is not empty
				if (
					shippingAddress === null ||
					Object.keys(shippingAddress).length === 0
				) {
					return <ShippingAddress setValues={setValues} values={values} />
				} else {
					return <AddressCard address={shippingAddress} />
				}

			case 1:
				if (
					billingAddress === null ||
					Object.keys(billingAddress).length === 0
				) {
					return <BillingAddress setValues={setValues} values={values} />
				} else {
					return <AddressCard address={billingAddress} />
				}
			case 2:
				return <PaymentReview />

			default:
				throw new Error('Unknown step')
		}
	}

	// loading shipping address and billing address
	useEffect(() => {
		log.trace(`[Payment].useEffect()`)
		getShippingAddress()
		getBillingAddress()
		log.trace(
			`[Payment].useEffect() shippingAddress => ${JSON.stringify(
				shippingAddress
			)}, billingAddress => ${JSON.stringify(billingAddress)}`
		)
	}, [])

	//load cart from redux: cart[sku]={quantity, product}
	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Link href='/'>
					<Typography component='h2' gutterBottom variant='overline'>
						Home
					</Typography>
				</Link>
				<Typography component='h1' variant='h3'>
					Payment
				</Typography>
			</div>

			<Grid className={classes.title} container spacing={4}>
				<Grid item sm={7} md={8} lg={9}>
					<Paper variant='outlined'>
						<div className={classes.content}>
							<Stepper activeStep={activeStep} className={classes.stepper}>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>

							{activeStep === steps.length ? (
								<PaymentConfirm />
							) : (
								<Fragment>
									{getStepView(activeStep)}
									<div className={classes.buttons}>
										{activeStep !== 0 && (
											<Button onClick={handleBack} className={classes.button}>
												Back
											</Button>
										)}
										<Button
											variant='contained'
											color='primary'
											onClick={handleNext}
											className={classes.button}
										>
											{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
										</Button>
									</div>
								</Fragment>
							)}
						</div>
					</Paper>
				</Grid>

				<Grid item sm={4} md={3} lg={3}>
					<CartSummary />
				</Grid>
			</Grid>
		</div>
	)
}

Payment.propTypes = {
	className: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		shippingAddress: state.payment.shippingAddress,
		billingAddress: state.payment.billingAddress,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getShippingAddress: () => dispatch(getShippingAddress()),
		getBillingAddress: () => dispatch(getBillingAddress()),
		saveAddress: (address) => dispatch(saveAddress(address)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
