import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CardSection from './CardSection'
import { connect } from 'react-redux'
import { securedPost } from 'libs/utils'
import log from 'libs/log'
/**
 * Display stripe Charger form
 */
const StripeCharger = (props) => {
	const { jwtToken } = props
	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault()

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make  sure to disable form submission until Stripe.js has loaded.
			return
		}

		const card = elements.getElement(CardElement)
		const result = await stripe.createToken(card)

		if (result.error) {
			// Show error to your customer.
			console.log(result.error.message)
		} else {
			// Send the token to your server.
			// This function does not exist yet; we will define it in the next step.
			await stripeTokenHandler(result.token)
		}
	}

	const stripeTokenHandler = async (token) => {
		const paymentData = {
			token: token.id,
			amount: 20.99,
			description: 'Rsky inc example charge',
		}

		// Use fetch to send the token ID and any other payment data to your server.
		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		// const response = await fetch('/charge', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(paymentData),
		// })

		//const headers = { headers: { 'Content-Type': 'application/json' } }
		// const payload = {
		// 	amount: 20.99,
		// 	description: 'Rsky inc example charge',
		// 	tokenId: token.id,
		// }

		let response = await securedPost(
			`/payments/pay/`,
			jwtToken,
			'POST',
			paymentData
		)

		//let response = await axios.post('/payment', paymentData, headers)
		log.trace(`pay response = ${JSON.stringify(response)}`)
		// Return and display the result of the charge.
		return response.json()
	}

	return (
		<form onSubmit={handleSubmit}>
			<CardSection />
			<button disabled={!stripe}>Confirm order</button>
		</form>
	)
}

const mapStateToProps = (state) => {
	return {
		jwtToken: state.auth.jwtToken,
	}
}

export default connect(mapStateToProps, null)(StripeCharger)
