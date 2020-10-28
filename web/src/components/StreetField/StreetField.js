import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Autocomplete from '@material-ui/lab/Autocomplete'
// import { CircularProgress, TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {},
}))

const StreetField = (props) => {
	const classes = useStyles()

	const [open, setOpen] = useState(false)
	// suggestions
	const [suggestions, setSuggestions] = useState([])

	const [query, setQuery] = useState('')

	const handleChange = (event) => {
		setQuery(event.target.value)
	}

	useEffect(() => {
		log.trace(`[StreetField].useEffect() query updated to ${query}`)
		// TODO: add auth header

		// if query is 6 chars and match regex, stop query
		if (query !== null && query !== '') {
			axios.get(`/geos/streets/${query}`).then(({ data }) => {
				log.trace(`[StreetField].suggestions data=${JSON.stringify(data)}`)

				setSuggestions(data)
			})
		}
	}, [query])

	return (
		<Autocomplete
			style={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true)
			}}
			onClose={() => {
				setOpen(false)
			}}
			getOptionSelected={(suggestion, value) => suggestion === value.name}
			getOptionLabel={(suggestion) => suggestion}
			options={suggestions}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Street'
					variant='outlined'
					onChange={handleChange}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>{params.InputProps.endAdornment}</React.Fragment>
						),
					}}
				/>
			)}
		/>
	)
}

export default StreetField
