import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Link,
	AppBar,
	Toolbar,
	Hidden,
	IconButton,
	Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Authbar from './Authbar'

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none',
	},
	flexGrow: {
		flexGrow: 1,
	},
	signOutButton: {
		marginLeft: theme.spacing(1),
	},
	title: {
		display: 'none',
		color: 'white',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
}))

const Topbar = (props) => {
	const { className, onSidebarOpen, currentUser, ...rest } = props
	const classes = useStyles()

	return (
		<AppBar {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<Link href='/'>
					<Typography
						className={classes.title}
						variant='h2'
						color='initial'
						noWrap
					>
						RSky
					</Typography>
				</Link>

				<div className={classes.flexGrow} />
				<Hidden mdDown>
					<Authbar currentUser={currentUser} />
				</Hidden>
				<Hidden lgUp>
					<IconButton color='inherit' onClick={onSidebarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	)
}

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func,
}

export default Topbar
