import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Bookmarks from "../components/bookmarks"
import Courses from "../components/courses"
import CreateCourse from "../components/createCourse"
import UpdateCourse from "../components/updateCourse"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/bookmarks" component={Bookmarks} />
      <PrivateRoute path="/app/courses" component={Courses} />
      <PrivateRoute path="/app/courses/create" component={CreateCourse} />
      <PrivateRoute path="/app/courses/:id/update" component={UpdateCourse} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
