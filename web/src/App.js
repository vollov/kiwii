import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'

import 'assets/scss/index.scss'
import Routes from 'Routes'
import theme from 'theme'

import { Chart } from 'react-chartjs-2'
import validate from 'validate.js'

import { chartjs } from 'helpers'
import validators from 'common/validators'

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
	draw: chartjs.draw,
})

validate.validators = {
	...validate.validators,
	...validators,
}

const browserHistory = createBrowserHistory()

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router history={browserHistory}>
				<Routes />
			</Router>
		</ThemeProvider>
	)
}

export default App

