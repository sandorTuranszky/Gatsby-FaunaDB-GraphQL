import React from "react"
import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"

// The Query is used by Apollo Client.
import { GET_COURSES_IN_REVIEW } from "../apollo/queries"

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
        <div style={{ color: `gray` }}>No courses available for review</div>
      )}

      {!loading && courses.length > 0 && (
        <>
          <div style={{ margin: `.5rem`, color: `gray`, fontWeight: `bold` }}>
            Courses to be reviewed:
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
                    to={`/app/courses/${course._id}/review`}
                    style={{
                      marginLeft: `1rem`,
                    }}
                  >
                    See details
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

const CoursesInReview = () => {
  let courses = []
  const { loading, error, data = {} } = useQuery(GET_COURSES_IN_REVIEW)

  if (data && data.allCoursesInReview) courses = data.allCoursesInReview.data

  return (
    <>
      <CourseList loading={loading} error={error} courses={courses} />
    </>
  )
}

export default CoursesInReview
