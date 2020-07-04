import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { navigate } from "gatsby"
import { cleanUp } from "../services/auth"

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`

const Logout = () => {
  const [logoutUser, { client, error, data = {} }] = useMutation(LOGOUT_USER)

  if (error) return error

  // When there is a response, navigate to the home page
  if (data.hasOwnProperty("logoutUser")) {
    // Remove token and user related data
    cleanUp()
    // Clear Apollo cache
    client.clearStore()
    navigate("/")
  }

  return (
    <>
      <a
        href="/"
        style={{
          color: `white`,
          marginRight: `0.5rem`,
        }}
        onClick={event => {
          event.preventDefault()
          logoutUser()
        }}
      >
        Logout
      </a>
    </>
  )
}

export default Logout
