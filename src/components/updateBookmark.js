import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const CREATE_BOOKMARK = gql`
  mutation updateBookmark(
    $id: ID!
    $private: Boolean!
    $userID: ID!
    $courseID: ID!
  ) {
    updateBookmark(
      id: $id
      data: {
        private: $private
        user: { connect: $userID }
        course: { connect: $courseID }
      }
    ) {
      _id
      private
    }
  }
`

const UpdateBookmark = ({
  bookmarkID,
  userID,
  courseID,
  text = "Bookmark",
  privateBookmark = false,
}) => {
  const [updateBookmark, { loading, error }] = useMutation(CREATE_BOOKMARK)

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
          style={{ marginLeft: `.5rem`, color: `blue` }}
          onClick={event => {
            event.preventDefault()

            updateBookmark({
              variables: {
                id: bookmarkID,
                private: privateBookmark,
                userID,
                courseID,
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

export default UpdateBookmark
