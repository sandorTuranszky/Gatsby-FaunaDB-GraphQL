import React from "react"
import { useQuery } from "@apollo/react-hooks"

import { getUser } from "../services/auth"
import UpdateBookmark from "../components/updateBookmark"
import DeleteBookmark from "../components/deleteBookmark"

// The Query is used by Apollo Client.
import { GET_DEVELOPER_BY_ID } from "../apollo/queries"

export const BookmarksList = ({ loading, error, bookmarks }) => {
  const userID = getUser()._id
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
                  <UpdateBookmark
                    bookmarkID={bookmark._id}
                    userID={userID}
                    courseID={bookmark.course._id}
                    text={bookmark.private ? "Make public" : "Make private"}
                    privateBookmark={!bookmark.private}
                  />
                  {"   "}
                  <DeleteBookmark bookmarkID={bookmark._id} />
                </li>
              )
            })}
          </ol>
        </>
      )}
    </>
  )
}

const Bookmarks = () => {
  let bookmarks = []
  const { loading, error, data = {} } = useQuery(GET_DEVELOPER_BY_ID, {
    variables: { id: getUser()._id },
  })

  if (data && data.findUserByID) bookmarks = data.findUserByID.bookmarks.data

  return (
    <>
      <BookmarksList loading={loading} error={error} bookmarks={bookmarks} />
    </>
  )
}

export default Bookmarks
