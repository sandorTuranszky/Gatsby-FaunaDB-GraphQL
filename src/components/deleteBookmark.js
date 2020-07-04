import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { getUser } from "../services/auth"
import { GET_USER_BY_ID } from "../apollo/queries"
import { GET_COURSES_WITH_BOOKMARKS } from "../apollo/queries"

const DELETE_BOOKMARK = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      _id
    }
  }
`

const DeleteBookmark = ({ bookmarkID, text = "Delete bookmark" }) => {
  const [deleteBookmark, { loading, error }] = useMutation(DELETE_BOOKMARK, {
    refetchQueries: [
      {
        query: GET_USER_BY_ID,
        variables: {
          id: getUser()._id,
        },
      },
      {
        query: GET_COURSES_WITH_BOOKMARKS,
        variables: { id: getUser()._id },
      },
    ],
  })

  return (
    <>
      {error && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>{error.message}</div>
      )}
      {loading ? (
        <span style={{ marginLeft: `1rem`, color: `gray` }}>Loading...</span>
      ) : (
        <a
          href="/"
          style={{ marginLeft: `.5rem`, color: `red` }}
          onClick={event => {
            event.preventDefault()

            deleteBookmark({
              variables: {
                id: bookmarkID,
              },
            })
          }}
        >
          {text}
        </a>
      )}
    </>
  )
}

export default DeleteBookmark
