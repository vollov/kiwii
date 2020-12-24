import bunyan from 'bunyan'
import cfg from '../config'

// const log = bunyan.createLogger(cfg.logging)
const log = bunyan.createLogger({
	name: cfg.app.name,
	streams: [
		{
			level: 'debug',
			type: 'rotating-file',
			path: './app.log',
			period: '14d',
			count: 3,
		},
		{
			level: 'debug',
			stream: process.stdout, // log INFO and above to stdout
		},
	],
})

export default log
