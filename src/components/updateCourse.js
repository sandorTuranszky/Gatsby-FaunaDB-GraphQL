import React from "react"
import { navigate } from "gatsby"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

// The Query is used by Apollo Client.
import { GET_COURSE_BY_ID } from "../apollo/queries"

const UPDATE_COURSE = gql`
  mutation updateCourse($id: ID!, $title: String!, $description: String!) {
    updateCourse(id: $id, data: { title: $title, description: $description }) {
      _id
      title
      description
    }
  }
`

export const UpdateForm = ({ course }) => {
  let titleInput
  let descriptionTextarea

  const [updateCourse, { loading, error, data = {} }] = useMutation(
    UPDATE_COURSE
  )

  if (data.updateCourse) navigate("/app/courses")

  return (
    <>
      <div style={{ marginBottom: `.5rem`, color: `gray`, fontWeight: `bold` }}>
        Update course:
      </div>
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

          updateCourse({
            variables: {
              id: course._id,
              title: titleInput.value,
              description: descriptionTextarea.value,
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
            <label htmlFor="email">Title</label>
          </div>
          <input
            type="text"
            name="title"
            aria-label="Title"
            size="51"
            defaultValue={course.title}
            ref={node => {
              titleInput = node
            }}
          />
        </div>
        <div
          style={{
            marginBottom: `1rem`,
          }}
        >
          <div>
            <label htmlFor="password">Description</label>
          </div>
          <textarea
            id="description"
            name="description"
            aria-label="Description"
            rows="4"
            cols="50"
            defaultValue={course.description}
            ref={node => {
              descriptionTextarea = node
            }}
          ></textarea>
        </div>
        <input
          type="submit"
          aria-label="Update"
          value="Update"
          disabled={loading}
        />{" "}
        {loading && <span>Loading...</span>}
      </form>
    </>
  )
}

const UpdateCourse = ({ id }) => {
  let course
  const { loading, error, data = {} } = useQuery(GET_COURSE_BY_ID, {
    variables: { id },
  })

  if (data && data.findCourseByID) {
    course = data.findCourseByID
    if (!course.description) course.description = ""
  }

  return (
    <>
      {loading && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>Loading...</div>
      )}

      {error && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>{error.message}</div>
      )}

      {!loading && !course && (
        <div style={{ color: `gray` }}>
          404: can't find the course with the given id
        </div>
      )}

      {!loading && course && <UpdateForm course={course} />}
    </>
  )
}

export default UpdateCourse
