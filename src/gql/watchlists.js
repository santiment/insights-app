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

export const ALL_USER_WATCHLISTS_WITH_ITEMS = gql`
  query fetchWatchlists {
    watchlists: fetchWatchlists {
      id
      name
      isPublic
      listItems {
        project {
          slug
        }
      }
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
