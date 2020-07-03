import gql from "graphql-tag"

export const GET_USER_BY_ID = gql`
  query findUserByID($id: ID!) {
    findUserByID(id: $id) {
      bookmarks {
        data {
          _id
          private
          course {
            title
            author {
              name
            }
          }
        }
      }
    }
  }
`

export const GET_USERS_WITH_BOOKMARKS = gql`
  {
    allUsers(role: DEVELOPER) {
      data {
        _id
        name
        email
        bookmarks {
          data {
            _id
            private
            course {
              title
              author {
                name
              }
            }
          }
        }
      }
    }
  }
`

export const GET_COURSES_WITH_BOOKMARKS = gql`
  {
    allCourses(_size: 10) {
      data {
        _id
        title
        author {
          _id
          name
        }
        bookmarks {
          data {
            title
            user {
              _id
            }
          }
        }
      }
    }
  }
`
