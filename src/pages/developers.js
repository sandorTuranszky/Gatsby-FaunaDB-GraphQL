import React from "react"
import { graphql } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import Layout from "../components/layout"
import SEO from "../components/seo"

// The Query is used by Apollo Client.
const GET_USERS_WITH_BOOKMARKS = gql`
  {
    allUsers(role: DEVELOPER) {
      data {
        _id
        name
        email
        bookmarks {
          data {
            _id
            title
            private
          }
        }
      }
    }
  }
`

export const Bookmarks = ({ loading, error, bookmarks }) => {
  return (
    <>
      {loading && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>Loading...</div>
      )}

      {error && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>{error.message}</div>
      )}

      {!loading && !bookmarks && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>
          No bookmarks available
        </div>
      )}

      {!loading && bookmarks && (
        <>
          <div style={{ margin: `.5rem`, color: `gray`, fontWeight: `bold` }}>
            Bookmarks:
          </div>
          <ol>
            {bookmarks.map(bookmark => {
              return (
                <li key={bookmark._id}>
                  {bookmark.title}
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
  const { loading, error, data = {} } = useQuery(GET_USERS_WITH_BOOKMARKS)

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

      <div
        style={{
          padding: `1rem`,
          marginTop: `1rem`,
          border: `1px solid gray`,
        }}
      >
        <p>This page contains a mix of static and dynamic data.</p>
        <ul>
          <li>
            The list of users is loaded at build time when Gatsby generates
            static pages
          </li>
          <li>Bookmarks are loaded dynamically</li>
        </ul>
      </div>
    </Layout>
  )
}

export default DevelopersPage

// This query fetches data during at time and is part of a static page produced by Gatsby
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
