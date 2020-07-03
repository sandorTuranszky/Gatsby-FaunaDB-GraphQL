import React from "react"

import { getUser } from "../services/auth"
import BookmarkButton from "../components/bookmarkButton"

const BookmarkManager = ({ bookmarks, courseID }) => {
  const userID = getUser()._id
  const hasBookmarked = bookmarks.find(({ user }) => user._id === userID)

  return (
    <>
      {hasBookmarked ? (
        <a href="/" style={{ marginLeft: `.5rem`, color: `orange` }}>
          Remove bookmark
        </a>
      ) : (
        <BookmarkButton userID={userID} courseID={courseID} />
      )}
    </>
  )
}

export default BookmarkManager
