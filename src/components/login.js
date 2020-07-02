import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { navigate } from "gatsby"
import {
  isLoggedIn,
  setToken,
  setUser,
  getPrivateRoute,
} from "../services/auth"

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      token
      user {
        _id
        name
        email
        role
      }
    }
  }
`

const Login = () => {
  let emailInput
  let passwordInput

  // Logged-in users should not see the login page
  if (isLoggedIn()) navigate(getPrivateRoute())

  const [loginUser, { loading, error, data = {} }] = useMutation(LOGIN_USER)

  if (data.loginUser) {
    // Save token in cookies
    setToken(data.loginUser.token)
    // Store user details
    setUser(data.loginUser.user)
    // Redirect to the default private page
    navigate(getPrivateRoute())
  }

  return (
    <>
      <h1>Log in</h1>
      {error && (
        <div
          style={{
            color: `red`,
          }}
        >
          {error.message}
        </div>
      )}
      <form
        method="post"
        onSubmit={event => {
          event.preventDefault()

          loginUser({
            variables: {
              email: emailInput.value,
              password: passwordInput.value,
            },
          })
        }}
      >
        <div
          style={{
            marginBottom: `1rem`,
          }}
        >
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="text"
            name="email"
            aria-label="Email"
            ref={node => {
              emailInput = node
            }}
          />
        </div>
        <div
          style={{
            marginBottom: `1rem`,
          }}
        >
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            name="password"
            aria-label="password"
            ref={node => {
              passwordInput = node
            }}
          />
        </div>
        <input
          type="submit"
          aria-label="Log in"
          value="Log In"
          disabled={loading}
        />{" "}
        {loading && <span>Loading...</span>}
      </form>
    </>
  )
}

export default Login
