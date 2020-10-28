import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	title: {
		marginTop: theme.spacing(3)
	},
	content: {
		marginTop: theme.spacing(2)
	},
	pagination: {
		marginTop: theme.spacing(3),
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end"
	}
}));

const Home = () => {
	const classes = useStyles();

	return <div className={classes.root}>Home Page</div>;
};

export default Home;
