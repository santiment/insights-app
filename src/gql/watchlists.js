import gql from 'graphql-tag'

export const ALL_USER_WATCHLISTS = gql`
  query fetchWatchlists {
    watchlists: fetchWatchlists {
      id
      name
      isPublic
    }
  }
`
