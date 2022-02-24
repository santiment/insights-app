import { query, mutate } from 'webkit/api'

const USER_WATCHLISTS_QUERY = `{
  watchlists:fetchWatchlists {
    id
    name
    isPublic
    isScreener
    listItems {
      project {
        id
      }
    }
  }
}`

const noScreeners = ({ isScreener }) => !isScreener
function precacher({ watchlists }) {
  return watchlists.filter(noScreeners)
}
const options = { precacher: () => precacher }
export const queryUserWatchlists = () => query(USER_WATCHLISTS_QUERY, options)

// -----------------

const CREATE_WATCHLIST_MUTATION = (name, description, isPublic) => `
  mutation {
    createWatchlist(name:"${name}",description:"${description}",isPublic:${isPublic}) {
      id
    }
  }
`
const createWatchlistAccessor = ({ createWatchlist }) => createWatchlist
export const mutateCreateWatchlist = (name, description, isPublic) =>
  mutate(CREATE_WATCHLIST_MUTATION(name, description, isPublic)).then(createWatchlistAccessor)

// -----------------

const ADD_WATCHLIST_ITEMS_MUTATION = `
  mutation addWatchlistItems($id: Int!, $items: [InputListItem]) {
    addWatchlistItems(id: $id, listItems: $items) {
      id
    }
  }
`
export const mutateAddWatchlistItems = (id, items) =>
  mutate(ADD_WATCHLIST_ITEMS_MUTATION, { variables: { id, items } })

const REMOVE_WATCHLIST_ITEMS_MUTATION = `
  mutation removeWatchlistItems($id: Int!, $items: [InputListItem]) {
    removeWatchlistItems(id: $id, listItems: $items) {
      id
    }
  }
`
export const mutateRemoveWatchlistItems = (id, items) =>
  mutate(REMOVE_WATCHLIST_ITEMS_MUTATION, { variables: { id, items } })
