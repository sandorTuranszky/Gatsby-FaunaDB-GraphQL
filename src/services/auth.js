import Cookies from "js-cookie"

const userKey = "user_data"

export const isBrowser = () => typeof window !== "undefined"

export const setToken = token => Cookies.set("token", token)

export const getToken = () => Cookies.get("token")

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(userKey)
    ? JSON.parse(window.localStorage.getItem(userKey))
    : {}

export const setUser = user =>
  window.localStorage.setItem(userKey, JSON.stringify(user))

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.email
}

export const logout = callback => {
  setUser({})
  callback()
}
