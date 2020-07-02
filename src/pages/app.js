import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Bookmarks from "../components/bookmarks"
import Courses from "../components/courses"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/bookmarks" component={Bookmarks} />
      <PrivateRoute path="/app/courses" component={Courses} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
