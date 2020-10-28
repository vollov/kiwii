import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import { Footer, Topbar } from 'components'
import { CssBaseline, Container } from '@material-ui/core'
import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 64,
	},
	paper: {
		// padding: theme.spacing(2),
		// marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		height: '100%',
	},
}))

const Main = (props) => {
	const { children, currentUser } = props

	const classes = useStyles()
	log.trace(`loading main layout, currentUser = ${JSON.stringify(currentUser)}`)
	return (
		<div className={classes.root}>
			<Topbar currentUser={currentUser} />
			<main className={classes.paper}>
				<Fragment>
					<CssBaseline />
					<Container>{children}</Container>
				</Fragment>
				<Footer />
			</main>
		</div>
	)
}

Main.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}

export default Main
