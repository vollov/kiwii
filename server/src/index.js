import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import path from 'path'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import YAML from 'yamljs'

// swagger configuration
const swaggerDefinition = YAML.load(path.join(__dirname, '/swagger/info.yaml'))
const options = {
	swaggerDefinition,
	apis: [path.join(__dirname, '/swagger/**/*.yaml')],
}
const swaggerSpec = swaggerJsDoc(options)

// app routes
import cfg from './config'
import log from './lib/logger'
import { header, authorization } from './auth/middleware'
import auth from './auth/router'
import product from './product/router'
import order from './order/router'
import payment from './payment/router'

const app = express()

//connect MongoDB
mongoose.Promise = global.Promise
// mongoose.set('debug', true)
mongoose.connect(cfg.db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})
mongoose.connection.once('open', () =>
	log.info(`Connected to mongo at ${cfg.db.url}`)
)

app.use(helmet())
// Enable All CORS Requests
app.use(Cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/static', express.static(path.join(cfg.media.image.root)))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const authMiddleware = [header, authorization]
app.use('*', authMiddleware)
app.use(cfg.app.api + 'auth', auth)
app.use(cfg.app.api + 'products', product)
app.use(cfg.app.api + 'orders', order)
app.use(cfg.app.api + 'payments', payment)
app.listen(cfg.app.PORT, () =>
	log.info(`Server started on port ${cfg.app.PORT}`)
)

module.exports = app
