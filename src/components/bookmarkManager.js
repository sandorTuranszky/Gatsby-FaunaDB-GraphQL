import React from "react"

import { getUser } from "../services/auth"
import CreateBookmark from "./createBookmark"
import DeleteBookmark from "./deleteBookmark"

const BookmarkManager = ({ bookmarks, bookmarkID, courseID }) => {
  const userID = getUser()._id
  const hasBookmarked = bookmarks.find(({ user }) => user._id === userID)

  return (
    <>
      {hasBookmarked ? (
        <DeleteBookmark bookmarkID={hasBookmarked._id} />
      ) : (
        <CreateBookmark userID={userID} courseID={courseID} />
      )}
    </>
  )
}

export default BookmarkManager
