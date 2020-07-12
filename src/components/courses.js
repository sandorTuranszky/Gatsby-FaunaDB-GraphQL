import React from "react"
import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"

import { getUser } from "../services/auth"

// The Query is used by Apollo Client.
import { GET_AUTHOR_BY_ID } from "../apollo/queries"

export const CourseList = ({ loading, error, courses }) => {
  return (
    <>
      {loading && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>Loading...</div>
      )}

      {error && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>{error.message}</div>
      )}

      {!loading && courses.length === 0 && (
        <div style={{ color: `gray` }}>No courses available</div>
      )}

      {!loading && courses.length > 0 && (
        <>
          <div style={{ margin: `.5rem`, color: `gray`, fontWeight: `bold` }}>
            Courses:
          </div>
          <ol>
            {courses.map(course => {
              return (
                <li key={course._id}>
                  {course.title}{" "}
                  {!course.visible && (
                    <span style={{ marginLeft: `.5rem`, color: `orange` }}>
                      (In review)
                    </span>
                  )}
                  <Link
                    to={`/app/courses/${course._id}/update`}
                    style={{
                      marginLeft: `1rem`,
                    }}
                  >
                    Update
                  </Link>
                </li>
              )
            })}
          </ol>
        </>
      )}
    </>
  )
}

const Courses = () => {
  let courses = []
  const { loading, error, data = {} } = useQuery(GET_AUTHOR_BY_ID, {
    variables: { id: getUser()._id },
  })

  if (data && data.findUserByID) courses = data.findUserByID.courses.data

  return (
    <>
      <Link
        to={`/app/courses/create`}
        style={{
          marginLeft: `.5rem`,
          fontWeight: `bold`,
        }}
      >
        Create new course
      </Link>
      <CourseList loading={loading} error={error} courses={courses} />
    </>
  )
}

export default Courses
