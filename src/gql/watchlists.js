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

export const CREATE_USER_WATCHLIST = gql`
  mutation createWatchlist($isPublic: Boolean, $name: String!) {
    createWatchlist(isPublic: $isPublic, name: $name) {
      id
    }
  }
`