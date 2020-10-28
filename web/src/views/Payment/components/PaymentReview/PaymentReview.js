import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { loadkey } from 'helpers'
import StripeCharger from './StripeCharger'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_BammtYPcKZvKpW9RDvZ8WXzS00KYk6kIll')

const PaymentReview = (props) => {
	return (
		<div>
			<h1>Payment Review</h1>
			<Elements stripe={stripePromise}>
				<StripeCharger />
			</Elements>
		</div>
	)
}

export default PaymentReview
