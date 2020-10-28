
import axios from "axios"
import cfg from 'config'

axios.defaults.baseURL = cfg.rest.BASE_URL;

axios.interceptors.request.use(req => {
  console.log(`${req.method} : ${req.url}`);

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  // TDOD: if Jwt_token is avaliable
  // add Header Authorization
  const token = localStorage.getItem(cfg.constant.AUTH_TOKEN);
	if (token) {
    req.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(cfg.constant.AUTH_USER)
  }
  
  return req;
});

export default axios