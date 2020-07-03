import React from "react"
import { useQuery } from "@apollo/react-hooks"

import { getUser } from "../services/auth"
import { Bookmarks as BookmarksList } from "../pages/developers"
// The Query is used by Apollo Client.
import { GET_USER_BY_ID } from "../apollo/queries"

const Bookmarks = () => {
  let bookmarks = []
  const { loading, error, data = {} } = useQuery(GET_USER_BY_ID, {
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
