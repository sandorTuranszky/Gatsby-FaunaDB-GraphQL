import gql from "graphql-tag"

export const GET_DEVELOPER_BY_ID = gql`
  query findUserByID($id: ID!) {
    findUserByID(id: $id) {
      bookmarks {
        data {
          _id
          private
          course {
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
  }
`

export const GET_AUTHOR_BY_ID = gql`
  query findUserByID($id: ID!) {
    findUserByID(id: $id) {
      courses {
        data {
          _id
          title
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
            _id
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

export const GET_COURSE_BY_ID = gql`
  query findCourseByID($id: ID!) {
    findCourseByID(id: $id) {
      _id
      title
      description
    }
  }
`
