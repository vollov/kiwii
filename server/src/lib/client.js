import axios from 'axios'
import cfg from '../config'

axios.defaults.baseURL = cfg.rest.BASE_URL

export default axios
