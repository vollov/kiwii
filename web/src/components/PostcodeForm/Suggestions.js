import React from 'react'
import log from 'libs/log'

const Suggestions = (props) => {
	const { postcodes } = props

	log.trace(`postcodes=${JSON.stringify(postcodes)}`)
	return (
		<ul>
			{postcodes.map((p) => (
				<li key={p.id}>{p.code}</li>
			))}
		</ul>
	)
}

export default Suggestions
