import { client } from '@/apollo'
import { PROJECTS_BY_TICKER_QUERY, INSIGHT_PROJECT_QUERY } from '@/gql/projects'
import {
  getPriceDataSincePublication,
  getPeriodSincePublication,
} from '@/logic/insights'

export function getInsightProject(insightId, from, to, apollo = client) {
  return apollo
    .query({
      query: INSIGHT_PROJECT_QUERY,
      variables: { insightId, from, to },
    })
    .then(({ data: { insight } }) => insight.project)
}

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

export function getInsightChartProjectData(insightId, ticker, publishDate) {
  const { from, to } = getPeriodSincePublication(publishDate)
  const toIso = to.toISOString()

  return getInsightProject(insightId, publishDate, toIso).then((project) =>
    getPriceDataSincePublication(
      project ? project.ticker : ticker,
      from.toISOString(),
      toIso,
    ).then((priceHistory) => Object.assign({ priceHistory }, project)),
  )
}
