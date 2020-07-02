import Cookies from "js-cookie"

const userKey = "user_data"

const tokenKey = "token"

const DEVELOPER = "DEVELOPER"

const AUTHOR = "AUTHOR"

export const loginRoute = "/app/login"

export const isBrowser = () => typeof window !== "undefined"

export const setToken = token => Cookies.set(tokenKey, token)

export const getToken = () => Cookies.get(tokenKey)

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(userKey)
    ? JSON.parse(window.localStorage.getItem(userKey))
    : {}

export const setUser = user =>
  window.localStorage.setItem(userKey, JSON.stringify(user))

export const isDeveloper = () => {
  const user = getUser()
  return user.role === DEVELOPER
}

export const isAuthor = () => {
  const user = getUser()
  return user.role === AUTHOR
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

export const privateRoutes = {
  default: [loginRoute],
  DEVELOPER: ["/app/bookmarks"],
  AUTHOR: ["/app/courses"],
}

export const getPrivateRoute = () => {
  const { role = "default" } = getUser()
  return privateRoutes[role][0]
}

export const allowedPrivateRoute = to => {
  const { role = "default" } = getUser()
  return privateRoutes[role].includes(to)
}

export const cleanUp = () => {
  Cookies.remove(tokenKey)
  setUser({})
}
