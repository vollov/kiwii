const cfg = {
	rest: {
		name: 'rsky',
		BASE_URL: 'http://localhost:5000/api',
	},
	google: {
		CLIENT_ID:
			'880282470989-cb9shpmh1ag559nndt15au9d4t4ab9gj.apps.googleusercontent.com',
		REDIRECT_URL: 'https://localhost:3001/google/callback',
		AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
		SCOPE:
			'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
	},
	facebook: {
		CLIENT_ID:
			'391236108561490',
		REDIRECT_URL: 'https://localhost:3001/facebook/callback',
		AUTH_URL: 'https://www.facebook.com/v8.0/dialog/oauth',
	},
	constant: {
		AUTH_TOKEN: 'rsky-token',
		AUTH_USER: 'rsky-user',
	},
	app: {
		pageSize: 20,
		MEDIA_URL: 'http://localhost:5000/static',
	}
}

export default cfg
