import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import {
  getUser,
  isLoggedIn,
  getPrivateRoute,
  isDeveloper,
  isAuthor,
} from "../services/auth"
import Logout from "../components/logout"

const Header = ({ siteTitle }) => {
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0, color: `white` }}>{siteTitle}</h1>
        <div style={{ display: `flex`, justifyContent: `space-between` }}>
          <div style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                marginRight: `0.5rem`,
              }}
            >
              Home
            </Link>
            <Link
              to="/developers"
              style={{
                color: `white`,
                marginRight: `0.5rem`,
              }}
            >
              Developers
            </Link>
          </div>
          <div>
            {isLoggedIn() ? (
              <>
                <span
                  style={{
                    color: `white`,
                    marginRight: `0.5rem`,
                  }}
                >{`Hello ${getUser().email}`}</span>
                <Link
                  to={getPrivateRoute()}
                  style={{
                    color: `white`,
                    marginRight: `0.5rem`,
                  }}
                >
                  {isDeveloper() ? (
                    <span>Bookmarks</span>
                  ) : isAuthor() ? (
                    <span>Courses</span>
                  ) : (
                    <span>Courses for review</span>
                  )}
                </Link>
                <Logout />
              </>
            ) : (
              <Link
                to="/app/login"
                style={{
                  color: `white`,
                  marginRight: `0.5rem`,
                }}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
