import store from 'stores/reducers'

const loadkey = () => {
	const state = store.getState()

	// get the JWT token out of it
	// (obviously depends on how your store is structured)
	return state.payment.pubkey
}

export default loadkey
