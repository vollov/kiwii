import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button, Fab } from '@material-ui/core'
import axios from 'axios'
import Suggestions from './Suggestions'
import log from 'libs/log'
const useStyles = makeStyles((theme) => ({
	root: {},
}))

const PostcodeForm = (props) => {
	const classes = useStyles()

	const [query, setQuery] = useState('')

	// The active selection's index
	const [activeIndex, setActiveIndex] = useState(0)

	// The suggestions that match the user's input
	const [filteredPostcodes, setFilteredPostcodes] = useState([])

	// Whether or not the suggestion list is shown
	const [showPostcodes, setShowPostcodes] = useState(false)

	// suggestions
	const [postcodes, setPostCodes] = useState([])

	useEffect(() => {
		log.trace(`[PostcodeForm].useEffect() query updated to ${query}`)
		// TODO: add auth header

		// if query is 6 chars and match regex, stop query
		if (query !== null && query !== '') {
			axios.get(`/geos/postcodes/${query}`).then(({ data }) => {
				log.trace(`[PostcodeForm].getPostcodes() data=${JSON.stringify(data)}`)

				setPostCodes(data)
			})
		}
	}, [query])

	const handlePostcodeChange = (e) => {
		const userInput = e.currentTarget.value
		setQuery(userInput)
	}

	// user clicks on a suggestion
	const onClick = (e) => {
		// empty suggessions and populate text field
		setPostCodes([])
		setQuery(e.currentTarget.innerText)
		setShowPostcodes(false)
	}

	// Event fired when the user presses a key down
	const onKeyDown = (e) => {
		// pressed the enter key
		if (e.keyCode === 13) {
		}
		// pressed the up arrow
		else if (e.keyCode === 38) {
		}
		// pressed the down arrow
		else if (e.keyCode === 40) {
		}
	}

	// https://opendata.arcgis.com/datasets/923cb3294384488e8a4ffbeb3b8f6cb2_32.csv

	return (
		<div>
			<TextField
				helperText='Canadian postal code'
				label='Postalcode'
				name='postcode'
				variant='outlined'
				placeholder='N2N1N3'
				onChange={handlePostcodeChange}
				value={query}
			/>
			<Suggestions postcodes={postcodes} />
		</div>
	)
}

export default PostcodeForm
