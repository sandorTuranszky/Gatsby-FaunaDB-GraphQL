import React from "react"
import { graphql } from "gatsby"
import { useQuery } from "@apollo/react-hooks"

import Layout from "../components/layout"
import SEO from "../components/seo"

// The Query is used by Apollo Client.
import { GET_USERS_WITH_BOOKMARKS } from "../apollo/queries"

export const Bookmarks = ({ loading, error, bookmarks }) => {
  return (
    <>
      {loading && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>Loading...</div>
      )}

      {error && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>{error.message}</div>
      )}

      {!loading && bookmarks.length === 0 && (
        <div style={{ color: `gray` }}>No bookmarks available</div>
      )}

      {!loading && bookmarks.length > 0 && (
        <>
          <div style={{ margin: `.5rem`, color: `gray`, fontWeight: `bold` }}>
            Bookmarks:
          </div>
          <ol>
            {bookmarks.map(bookmark => {
              return (
                <li key={bookmark._id}>
                  {bookmark.course.title} ({bookmark.course.author.name}){" "}
                  {bookmark.private && (
                    <span style={{ marginLeft: `.5rem`, color: `orange` }}>
                      (Private)
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </>
      )}
    </>
  )
}

const UsersList = ({ users }) => {
  const { loading, error, data = {} } = useQuery(GET_USERS_WITH_BOOKMARKS, {
    fetchPolicy: "cache-and-network",
  })

  if (data.allUsers && data.allUsers.data) {
    users = data.allUsers.data
  }

  return users.map(item => (
    <li key={item._id}>
      <span style={{ fontWeight: `bold` }}>{item.name}</span> ({item.email})
      <Bookmarks
        loading={loading}
        error={error}
        bookmarks={item.bookmarks ? item.bookmarks.data : []}
      />
    </li>
  ))
}

const DevelopersPage = ({ data: { FaunaDB } }) => {
  const users = FaunaDB.allUsers.data

  return (
    <Layout>
      <SEO title="Home" />
      {users && (
        <ul>
          <UsersList users={users} />
        </ul>
      )}
    </Layout>
  )
}

export default DevelopersPage

// This query fetches data at build time and is part of a static page produced by Gatsby
export const pageQuery = graphql`
  query {
    FaunaDB {
      allUsers(role: DEVELOPER) {
        data {
          _id
          name
          email
        }
      }
    }
  }
`
