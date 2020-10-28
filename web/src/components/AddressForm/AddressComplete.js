import React, { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import log from 'libs/log'

const useStyles = makeStyles((theme) => ({
	root: {},
}))

const initialValues = {
	street: '',
}

/**
 * auto complete component with street drop downs
 */
const AddressComplete = (props) => {
	const classes = useStyles()

	const [suggestions, setSuggestions] = useState([])
	const { address, setAddress } = props
	const [query, setQuery] = useState('')

	const [values, setValues] = useState({ ...initialValues })

	useEffect(() => {
		log.trace(`[StreetField].useEffect() query updated to ${query}`)
		// TODO: add auth header

		// if query is 6 chars and match regex, stop query
		if (query !== null && query !== '') {
			axios.get(`/geos/streets/${query}`).then(({ data }) => {
				log.trace(`[StreetField].suggestions data=${JSON.stringify(data)}`)
				// suggestion = {street, city, province}
				// const opts = data.map((s) => {
				// 	return {
				// 		value: s.street,
				// 		label: `${s.street}, ${s.city}, ${s.province}`,
				// 	}
				// })
				setSuggestions(data)
				//setOptions(opts)
			})
		}
	}, [query])

	const handleStreetValueChange = (e) => {
		log.trace(`handle street value change`)
	}

	// user selected an item
	const onClose = (e) => {
		log.trace(
			`handle onClose change value=${values.street} v=${e.target.value}`
		)
	}

	// user change inputs
	const handleStreetChange = (event) => {
		log.trace(
			`handle street TextField value change value=${event.target.value}`
		)

		setQuery(event.target.value)
	}

	const handleChange = (event) => {
		log.trace(
			`[AddressComplete].handleChange() field=${event.target.name}  value=${event.target.value}`
		)
		event.persist()
		setValues({
			...values,
			[event.target.name]:
				event.target.type === 'checkbox'
					? event.target.checked
					: event.target.value,
		})
	}

	const streetSelected = (suggestion, value) => {
		log.trace(
			`handle streetSelected suggestion=${JSON.stringify(
				suggestion
			)}, value=${JSON.stringify(value)}`
		)

		// setValues({
		// 	...values,
		// 	// street: value.street,
		// 	city: value.city,
		// 	province: value.province,
		// })

		return true
		// return (
		// 	suggestion.street === value.street &&
		// 	suggestion.city === value.city &&
		// 	suggestion.province === value.province
		// )
		//suggestion === value.name
	}

	return (
		<Grid item md={7} xs={12}>
			<Autocomplete
				fullWidth
				getOptionSelected={streetSelected}
				getOptionLabel={(s) => `${s.street}, ${s.city}, ${s.province}`}
				options={suggestions}
				// onChange={handleStreetValueChange}
				onClose={onClose}
				onChange={handleStreetValueChange}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Street'
						variant='outlined'
						onChange={handleStreetChange}
						value={values.street}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/>
		</Grid>
	)
}

export default AddressComplete
