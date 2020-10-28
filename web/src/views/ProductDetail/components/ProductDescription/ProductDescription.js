import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import log from "libs/log";

const useStyles = makeStyles(theme => ({
	root: {
		height: "100%"
	},
	content: {
		alignItems: "center",
		display: "flex"
	},
	title: {
		fontWeight: 700
	},
	top3: {
		marginTop: theme.spacing(3)
	},
	specs: {
		marginLeft: theme.spacing(3),
		listStyleType: "square"
	}
}));

const ProductDescription = props => {
	const { product, className, ...rest } = props;

	const classes = useStyles();

	const spec1 = {}
	const spec2 = {}

	let i = 1
	let k = ""
	for(k in product.specification){
		if(i % 2 === 1){
			spec1[k] = product.specification[k]
		} else {
			spec2[k] = product.specification[k]
		}
		i++
	}

	return product ? (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<Grid container spacing={1} justify="space-between">
					<Grid item lg={12}>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
							variant="body2"
						>
							Specification
						</Typography>
					</Grid>

					<Grid item lg={6}>
						<TableContainer component={Paper}>
							<Table
								className={classes.table}
								size="small"
								aria-label="a dense table"
							>
								<TableBody>
									{Object.keys(spec1).map((key) => {
					
											return (
												<TableRow key={key}>
													<TableCell component="th" scope="row">
														{key}
													</TableCell>
													<TableCell align="left">
														{spec1[key]}
													</TableCell>
												</TableRow>
											);
										
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>

					<Grid item lg={6}>
						<TableContainer component={Paper}>
							<Table
								className={classes.table}
								size="small"
								aria-label="a dense table"
							>
								<TableBody>
								{Object.keys(spec2).map((key) => {
					
					return (
						<TableRow key={key}>
							<TableCell component="th" scope="row">
								{key}
							</TableCell>
							<TableCell align="left">
								{spec2[key]}
							</TableCell>
						</TableRow>
					);
				
			})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item lg={12} className={classes.top3}>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
							variant="body2"
						>
							Includes
						</Typography>

						<ul className={classes.specs}>
							{Object.keys(product.package).map(key => (
								<li key={key}>
									<Typography className={classes.top1} variant="body1">
										{product.package[key]}
									</Typography>
								</li>
							))}
						</ul>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	) : (
		<div>Loading product description...</div>
	);
};

ProductDescription.propTypes = {
	className: PropTypes.string
};

export default ProductDescription;
