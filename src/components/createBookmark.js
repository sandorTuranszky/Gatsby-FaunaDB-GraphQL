import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { getUser } from "../services/auth"
import {
  GET_COURSES_WITH_BOOKMARKS,
  GET_DEVELOPER_BY_ID,
  GET_USERS_WITH_BOOKMARKS,
} from "../apollo/queries"

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
      title
      user {
        _id
      }
    }
  }
`

const CreateBookmark = ({
  userID,
  courseID,
  text = "Bookmark",
  privateBookmark = false,
}) => {
  const [createBookmark, { loading, error, client }] = useMutation(
    CREATE_BOOKMARK,
    {
      update(cache, { data: { createBookmark } }) {
        // Update cache
        const cacheData = client.readQuery({
          query: GET_COURSES_WITH_BOOKMARKS,
        })

        let cacheCopy = JSON.parse(JSON.stringify(cacheData))
        cacheCopy.allCourses.data = cacheCopy.allCourses.data.map(item => {
          if (item._id === courseID) {
            item.bookmarks.data.push(createBookmark)
          }
          return item
        })

        client.writeQuery({
          query: GET_COURSES_WITH_BOOKMARKS,
          data: { ...cacheCopy },
        })
      },
      refetchQueries: [
        {
          query: GET_DEVELOPER_BY_ID,
          variables: {
            id: getUser()._id,
          },
        },
        {
          query: GET_USERS_WITH_BOOKMARKS,
        },
      ],
    }
  )

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
