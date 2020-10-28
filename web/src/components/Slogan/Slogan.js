/**
 * slogan section for signin and signup
 */

import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	quoteContainer: {
		[theme.breakpoints.down("md")]: {
			display: "none"
		}
	},
	quote: {
		backgroundColor: theme.palette.neutral,
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundImage: "url(/images/drone-auth.jpg)",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center"
	},
	quoteInner: {
		textAlign: "center",
		flexBasis: "600px"
	},
	quoteText: {
		color: theme.palette.white,
		fontWeight: 300
	},
	name: {
		marginTop: theme.spacing(3),
		color: theme.palette.white
	},
	bio: {
		color: theme.palette.white
	}
}));

const Slogan = props => {
	const classes = useStyles();

	return (
		<Grid className={classes.quoteContainer} item lg={5}>
			<div className={classes.quote}>
				<div className={classes.quoteInner}>
					<Typography className={classes.quoteText} variant="h1">
						Join Rsky with your Drone.
					</Typography>
					<div className={classes.person}>
						<Typography className={classes.name} variant="body1">
							Rsky Inc
						</Typography>
						<Typography className={classes.bio} variant="body2">
							Vision for the future
						</Typography>
					</div>
				</div>
			</div>
		</Grid>
	);
};

Slogan.propTypes = {
	style: PropTypes.object
};

export default Slogan;
