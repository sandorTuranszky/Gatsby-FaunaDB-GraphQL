import React from "react"
import { useQuery } from "@apollo/react-hooks"

import ApproveCourse from "../components/approveCourse"
// The Query is used by Apollo Client.
import { GET_COURSE_UPDATE_HISTORY_BY_ID } from "../apollo/queries"

const combineChanges = updates => {
  let finalState = {}
  updates.data.forEach(({ data }) => {
    if (data) {
      finalState.title = data.title || finalState.title
      finalState.description = data.description || finalState.description
      finalState.visible =
        data.visible !== null ? data.visible : finalState.visible
    }
  })
  return finalState
}

export const ChangesView = ({ updates, id }) => {
  let finalState = combineChanges(updates)

  return (
    <>
      <div>
        <p style={{ marginBottom: `.5rem`, color: `gray`, fontWeight: `bold` }}>
          Course latest state: <ApproveCourse course={{ ...finalState, id }} />
        </p>
        <ul>
          <li>Title: {finalState.title}</li>
          <li>Description: {finalState.description}</li>
          <li>
            Visible:{" "}
            {finalState.visible ? <span>Visible</span> : <span>Hidden</span>}
          </li>
        </ul>
      </div>
      <div style={{ marginBottom: `.5rem`, color: `gray`, fontWeight: `bold` }}>
        Course updates history:
      </div>
      <ol>
        {updates.data.map(update => {
          return (
            <li key={update.ts}>
              <div>
                <div>Update type: {update.action}</div>
                {update.data && update.data.title && (
                  <div>Title: {update.data.title}</div>
                )}
                {update.data && update.data.description && (
                  <div>Description: {update.data.description}</div>
                )}
                {update.data && (
                  <div>
                    Visible:{" "}
                    {update.data.visible ? (
                      <span>Visible</span>
                    ) : (
                      <span>Hidden</span>
                    )}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </>
  )
}

const CoursesInReviewDetails = ({ id }) => {
  let updates
  const { loading, error, data = {} } = useQuery(
    GET_COURSE_UPDATE_HISTORY_BY_ID,
    {
      variables: { id },
    }
  )

  if (data && data.courseUpdateHistory) updates = data.courseUpdateHistory

  return (
    <>
      {loading && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>Loading...</div>
      )}

      {error && (
        <div style={{ marginLeft: `1rem`, color: `gray` }}>{error.message}</div>
      )}

      {!loading && !updates && (
        <div style={{ color: `gray` }}>
          404: can't find updates for the course with the given id
        </div>
      )}

      {!loading && updates && <ChangesView updates={updates} id={id} />}
    </>
  )
}

export default CoursesInReviewDetails
