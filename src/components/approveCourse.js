import React from "react"
import { navigate } from "gatsby"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { GET_COURSES_IN_REVIEW } from "../apollo/queries"

const APPROVE_COURSE = gql`
  mutation updateCourse(
    $id: ID!
    $title: String!
    $description: String
    $visible: Boolean!
  ) {
    updateCourse(
      id: $id
      data: { title: $title, description: $description, visible: $visible }
    ) {
      _id
      title
      description
      visible
    }
  }
`

const ApproveCourse = ({ course: { id, title, description } }) => {
  const [updateCourse, { loading, error, data = {} }] = useMutation(
    APPROVE_COURSE,
    {
      refetchQueries: [
        {
          query: GET_COURSES_IN_REVIEW,
        },
      ],
    }
  )

  if (data.updateCourse) navigate("/app/courses/review")

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

            updateCourse({
              variables: {
                id,
                title,
                description,
                visible: true,
              },
            })
          }}
        >
          Approve
        </a>
      )}
    </>
  )
}

export default ApproveCourse
