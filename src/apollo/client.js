import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
import { getToken } from "../services/auth"

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  request: operation => {
    const token = getToken() || process.env.FAUNADB_BOOTSTRAP_KEY
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  },
  fetch,
})
