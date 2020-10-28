import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Grid,
	Button,
	CssBaseline,
	Container,
	Typography,
} from '@material-ui/core'

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons'
import cfg from 'config'
import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
		flexGrow: 1,
	},
	flexGrow: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
	},

	title: {
		marginTop: theme.spacing(3),
	},
	socialButtons: {
		marginTop: theme.spacing(3),
	},
	socialIcon: {
		marginRight: theme.spacing(1),
	},
}))

const SignIn = (props) => {
	const classes = useStyles()

	// pass [from] object to google as state parameter, and pass it to GoogleCallback component
	const { from } = props.location.state || { from: { pathname: '/' } }
	log.debug(`SignIn path from=${JSON.stringify(from)}`)

	// 	https://accounts.google.com/o/oauth2/v2/auth?
	//  scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&
	//  include_granted_scopes=true&
	//  state=state_parameter_passthrough_value&
	//  redirect_uri=http%3A%2F%2Foauth2.example.com%2Fcallback&
	//  response_type=token&
	//  client_id=client_id
	const getGoogleUrl = () => {
		const authUrl = cfg.google.AUTH_URL
		const scope = encodeURIComponent(cfg.google.SCOPE)
		const client_id = cfg.google.CLIENT_ID
		const redirect_uri = encodeURIComponent(cfg.google.REDIRECT_URL)
		return `${authUrl}?scope=${scope}&state=${JSON.stringify(
			from
		)}&redirect_uri=${redirect_uri}&response_type=token&client_id=${client_id}`
	}

	// https://www.facebook.com/v8.0/dialog/oauth?
	// client_id={app-id}
	// &redirect_uri={"https://www.domain.com/login"}
	// &state={"{st=state123abc,ds=123456789}"}
	const getFacebookUrl = () => {
		const authUrl = cfg.facebook.AUTH_URL
		const client_id = cfg.facebook.CLIENT_ID
		const redirect_uri = encodeURIComponent(cfg.facebook.REDIRECT_URL)
		return `${authUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}`
		// const state = { st: "state123abc", ds: 123456789 }

		// return `${authUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&state={${JSON.stringify(state)}}`
	}

	const [formState, setFormState] = useState({
		googleUrl: getGoogleUrl(),
		facebookUrl: getFacebookUrl(),
	})

	useEffect(() => {
		setFormState((formState) => ({
			...formState,
		}))
	}, [])

	// check apollo client cache, if currentUser is not empty, redirect to dashboard

	return (
		<div className={classes.root}>
			<Container component='main' maxWidth='sm'>
				<CssBaseline />
				<Grid className={classes.paper} container>
					<Typography className={classes.title} variant='h2'>
						Sign in
					</Typography>
					<Typography color='textSecondary' gutterBottom>
						Sign in with social media
					</Typography>

					<Grid className={classes.socialButtons} container>
						<Grid item>
							<Button
								color='primary'
								// onClick={handleSignIn}
								href={formState.facebookUrl}
								size='large'
								variant='contained'
							>
								<FacebookIcon className={classes.socialIcon} />
								Login with Facebook
							</Button>
						</Grid>
						<div className={classes.flexGrow} />
						<Grid item>
							<Button
								// onClick={handleSignIn}
								href={formState.googleUrl}
								size='large'
								variant='contained'
							>
								<GoogleIcon className={classes.socialIcon} />
								Login with Google
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

SignIn.propTypes = {
	className: PropTypes.string,
}

export default withRouter(SignIn)
