import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { navigate } from "gatsby"
import { isLoggedIn, setToken, setUser } from "../services/auth"

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password })
  }
`

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let emailInput
  let passwordInput

  if (isLoggedIn()) {
    navigate(`/app/bookmarks`)
  }

  const [loginUser, { loading, error, data = {} }] = useMutation(LOGIN_USER)

  if (data.loginUser) {
    setToken(data.loginUser)
    /**
     * This is purely for simplicity reasons
     * In the real-life project, the login mutation could return user data along with the token
     */
    setUser({ email, password })
    navigate(`/app/bookmarks`)
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

          setEmail(emailInput.value)
          setPassword(passwordInput.value)

          loginUser({
            variables: {
              email,
              password,
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
