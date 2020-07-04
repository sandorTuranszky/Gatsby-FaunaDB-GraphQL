import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const CREATE_BOOKMARK = gql`
  mutation createBookmark($private: Boolean!, $userID: ID!, $courseID: ID!) {
    createBookmark(
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

const CreateBookmark = ({
  userID,
  courseID,
  text = "Bookmark",
  privateBookmark = false,
}) => {
  const [createBookmark, { loading, error, data = {} }] = useMutation(
    CREATE_BOOKMARK
  )

  if (data.createBookmark) {
    console.log("createBookmark: ", data.createBookmark)
  }

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

            createBookmark({
              variables: {
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

export default CreateBookmark
