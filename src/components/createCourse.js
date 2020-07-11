import React from "react"
import { navigate } from "gatsby"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { getUser } from "../services/auth"
import { GET_AUTHOR_BY_ID } from "../apollo/queries"

const CREATE_COURSE = gql`
  mutation createCourse($title: String!, $description: String!, $userID: ID!) {
    createCourse(
      data: {
        title: $title
        description: $description
        visible: false
        author: { connect: $userID }
      }
    ) {
      _id
      title
      visible
      description
    }
  }
`

export const CreateForm = () => {
  let titleInput
  let descriptionTextarea

  const [createCourse, { client, loading, error, data = {} }] = useMutation(
    CREATE_COURSE,
    {
      update(cache, { data: { createCourse } }) {
        const cacheData = client.readQuery({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: getUser()._id,
          },
        })

        cacheData.findUserByID.courses.data.push(createCourse)

        client.writeQuery({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: getUser()._id,
          },
          data: { ...cacheData },
        })
      },
    }
  )

  if (data.createCourse) navigate("/app/courses")

  return (
    <>
      <div style={{ marginBottom: `.5rem`, color: `gray`, fontWeight: `bold` }}>
        Create new course
      </div>
      {error && (
        <div
          style={{
            color: `red`,
          }}
        >
          {error.message}
        </div>
      )}
      <form
        method="post"
        onSubmit={event => {
          event.preventDefault()

          createCourse({
            variables: {
              title: titleInput.value,
              description: descriptionTextarea.value,
              userID: getUser()._id,
            },
          })
        }}
      >
        <div
          style={{
            marginBottom: `1rem`,
          }}
        >
          <div>
            <label htmlFor="email">Title</label>
          </div>
          <input
            type="text"
            name="title"
            aria-label="Title"
            size="51"
            ref={node => {
              titleInput = node
            }}
          />
        </div>
        <div
          style={{
            marginBottom: `1rem`,
          }}
        >
          <div>
            <label htmlFor="password">Description</label>
          </div>
          <textarea
            id="description"
            name="description"
            aria-label="Description"
            rows="4"
            cols="50"
            ref={node => {
              descriptionTextarea = node
            }}
          ></textarea>
        </div>
        <input
          type="submit"
          aria-label="Create"
          value="Create"
          disabled={loading}
        />{" "}
        {loading && <span>Loading...</span>}
      </form>
    </>
  )
}

const CreateCourse = () => {
  return <CreateForm />
}

export default CreateCourse
