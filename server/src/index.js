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
import axios from 'axios'
// loading config
import dotenv from 'dotenv'
dotenv.config()

// swagger configuration
const swaggerDefinition = YAML.load(path.join(__dirname, '/swagger/info.yaml'))
const options = {
	swaggerDefinition,
	apis: [path.join(__dirname, '/swagger/**/*.yaml')],
}
const swaggerSpec = swaggerJsDoc(options)

// app routes
import cfg from '~/src/config'
import log from './lib/logger'
import { header, authorization } from './lib/middleware'
import auth from './auth/router'
import product from './product/router'
import order from './order/router'
//import geo from './geo/router'
import payment from './payment/router'

const app = express()


axios.defaults.baseURL = cfg.rest.BASE_URL

//connect MongoDB
mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})
mongoose.connection.once('open', () =>
	console.log(`Connected to mongo at ${process.env.MONGODB_URI}`)
)

app.use(helmet())
// Enable All CORS Requests
app.use(Cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/static', express.static(path.join(cfg.media.image.root)))

app.get('/conf', (req, res) => {
  res.send(cfg)
})

const authMiddleware = [header, authorization]
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
if (process.env.ENV !== 'dev') {
	log.info(`loading prod settings`)
}
app.all('*', authMiddleware)
app.use(cfg.app.api + 'auth', auth)
app.use(cfg.app.api + 'products', product)
app.use(cfg.app.api + 'orders', order)
app.use(cfg.app.api + 'payments', payment)
app.listen(process.env.PORT, () =>
	log.info(`Listening on port ${process.env.PORT}`)
)

module.exports = app
