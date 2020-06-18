import React from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>
      It is a starter Gatsby project that we'll use to build a real MVP with
      authentication and a few social features with as little coding as
      possible.
    </p>
    <p>
      Watch me doing it or take part in this exciting process to learn, how
      powerful JAMstack is when combined with Fauna serverless database.
    </p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
