import { client } from '@/apollo'
import { PROJECTS_BY_TICKER_QUERY } from '@/gql/projects'

export function getProjectByTicker(ticker, apollo = client) {
  return apollo
    .query({
      query: PROJECTS_BY_TICKER_QUERY,
      variables: { ticker },
    })
    .then(
      ({ data: { allProjectsByTicker } }) =>
        allProjectsByTicker[0] || Promise.reject(),
    )
}
