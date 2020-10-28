import React, { useEffect, Fragment } from 'react'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import cfg from 'config'
import log from 'libs/log'

import { facebookLogin, authState } from 'stores/actions/auth'

/**
 * send access_token to REST_HOST/facebook/login,
 * store user in local and redirect to /home
 */
const FacebookCallback = (props) => {
  const { facebookLogin, status, location } = props
  const values = queryString.parse(location.search)

  useEffect(() => {
    // request facebbok/login/:code 
    // write jwt token and user into redux
    facebookLogin(values.code)
  })

  return (
    <Fragment>
      <div>Google Callback Error :(</div>
    </Fragment>
  )
  // if (status === authState.LOGIN) {
  //   return <Redirect to={from} />
  // } else {
  //   return (
  //     <Fragment>
  //       <div>Google Callback Error :(</div>
  //     </Fragment>
  //   )
  // }
}

// export default FacebookCallback

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    facebookLogin: (token) => dispatch(facebookLogin(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookCallback)
