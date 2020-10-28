import React from 'react'
import log from 'libs/log'

const Suggestions = (props) => {
	const { suggestions } = props

	log.trace(`suggestions=${JSON.stringify(suggestions)}`)
	return (
		<ul>
			{suggestions.map((s) => (
				<li key={s.id}>{`${s.street}, ${s.city}, ${s.city}`}</li>
			))}
		</ul>
	)
}

export default Suggestions
