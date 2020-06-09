import { UPDATE_WATCHLIST } from '@/gql/watchlists'
import { client } from '@/apollo'

const mapWatchlistUpdateProjects = ({ project: { id: projectId } }) => ({
  project_id: +projectId,
})

const updateWatchlist = ({ id, listItems }, reducer) =>
  client.mutate({
    mutation: UPDATE_WATCHLIST,
    variables: {
      id: +id,
      listItems: reducer(listItems.map(mapWatchlistUpdateProjects)),
    },
  })

export const addProjectToWatchlist = (projectId, watchlist) =>
  updateWatchlist(watchlist, (listItems) => {
    listItems.push({ project_id: projectId })
    return listItems
  })

export const removeProjectFromWatchlist = (projectId, watchlist) =>
  updateWatchlist(watchlist, (listItems) =>
    listItems.filter(({ project_id }) => project_id !== projectId),
  )
