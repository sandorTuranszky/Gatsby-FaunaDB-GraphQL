import React from "react"
// import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"

// import { getUser } from "../services/auth"

// The Query is used by Apollo Client.
import { GET_COURSE_BY_ID } from "../apollo/queries"

export const UpdateForm = ({ loading, error, course }) => {
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

      {!loading && course && (
        <>
          <div style={{ margin: `.5rem`, color: `gray`, fontWeight: `bold` }}>
            Update course:
          </div>
          <ol>
            <li>Title: {course.title}</li>
            <li>Description: {course.description}</li>
          </ol>
        </>
      )}
    </>
  )
}

const UpdateCourse = ({ id }) => {
  console.log("id: ", id)
  let course
  const { loading, error, data = {} } = useQuery(GET_COURSE_BY_ID, {
    variables: { id },
  })

  if (data && data.findCourseByID) course = data.findCourseByID

  return (
    <>
      <UpdateForm loading={loading} error={error} course={course} />
    </>
  )
}

export default UpdateCourse
