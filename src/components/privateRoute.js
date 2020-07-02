import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, loginRoute, allowedPrivateRoute } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== loginRoute) {
    navigate(loginRoute)
    return null
  } else if (isLoggedIn()) {
    // Loggedin user should not go to the login page
    if (location.pathname === loginRoute) {
      navigate("/")
      return null
      // Check if loggedin user is allowed to navigate to the given route
    } else if (!allowedPrivateRoute(location.pathname)) {
      navigate(loginRoute)
      return null
    }
  }

  return <Component {...rest} />
}

export default PrivateRoute
