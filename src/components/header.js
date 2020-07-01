import React from "react"
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"

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
                  to="/app/bookmarks"
                  style={{
                    color: `white`,
                    marginRight: `0.5rem`,
                  }}
                >
                  Bookmarks
                </Link>
                <a
                  href="/"
                  style={{
                    color: `white`,
                    marginRight: `0.5rem`,
                  }}
                  onClick={event => {
                    event.preventDefault()
                    logout(() => navigate(`/app/login`))
                  }}
                >
                  Logout
                </a>
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
