import React from "react"
import { graphql } from "gatsby"
import { useQuery } from "@apollo/react-hooks"

import { getUser } from "../services/auth"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { isLoggedIn, isDeveloper } from "../services/auth"
import BookmarkManager from "../components/bookmarkManager"

// The Query is used by Apollo Client.
import { GET_COURSES_WITH_BOOKMARKS } from "../apollo/queries"

const CoursesList = ({ courses }) => {
  return (
    <ul>
      {courses &&
        courses.map(item => {
          return (
            <li key={item._id}>
              {item.title} ({item.author.name}){" "}
            </li>
          )
        })}
    </ul>
  )
}

const CoursesListWithBookmarks = ({ courses }) => {
  const { loading, error, data = {} } = useQuery(GET_COURSES_WITH_BOOKMARKS, {
    variables: { id: getUser()._id },
  })

  if (data && data.allCourses) {
    courses = data.allCourses.data
  }

  return (
    <>
      {error && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>{error.message}</div>
      )}
      <ul>
        {courses &&
          courses.map(item => {
            return (
              <li key={item._id}>
                {item.title} ({item.author.name}){" "}
                {loading && (
                  <span style={{ marginLeft: `1rem`, color: `gray` }}>
                    Loading...
                  </span>
                )}
                {item.bookmarks && item.bookmarks.data && (
                  <BookmarkManager
                    bookmarks={item.bookmarks.data}
                    courseID={item._id}
                  />
                )}
              </li>
            )
          })}
      </ul>
    </>
  )
}

const IndexPage = ({ data: { FaunaDB } }) => {
  let courses = FaunaDB.allCourses.data

  return (
    <Layout>
      <SEO title="Home" />
      {isLoggedIn() && isDeveloper() ? (
        <CoursesListWithBookmarks courses={courses} />
      ) : (
        <CoursesList courses={courses} />
      )}
    </Layout>
  )
}

export default IndexPage

// This query fetches data at build time and is part of a static page produced by Gatsby
export const pageQuery = graphql`
  query {
    FaunaDB {
      allCourses(_size: 10) {
        data {
          _id
          title
          author {
            _id
            name
          }
        }
      }
    }
  }
`
