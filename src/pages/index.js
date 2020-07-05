import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data: { FaunaDB } }) => {
  const data = FaunaDB.allCourses.data
  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data &&
          data.map(item => {
            return (
              <li key={item._id}>
                {item.title} ({item.author.name})
              </li>
            )
          })}
      </ul>
    </Layout>
  )
}

export default IndexPage

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
