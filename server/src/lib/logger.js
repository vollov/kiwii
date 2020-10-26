import bunyan from 'bunyan'
import cfg from '~/src/config'

const log = bunyan.createLogger(cfg.logging)

export default log
