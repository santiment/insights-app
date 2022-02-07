import { query, newSSRQuery } from 'webkit/api'
import { ONE_DAY_IN_MS } from 'webkit/utils/dates'

const PRICE_QUERY = (slug, from, to, interval = '1d') => `{
  getMetric(metric:"price_usd") {
    data:timeseriesData(slug:"${slug}",from:"${from}",to:"${to}",interval:"${interval}") {
      d: datetime,
      v: value
    }
  }
}`

function normalizeInterval(from) {
  const fromDate = new Date(from)
  const diff = (Date.now() - fromDate) / ONE_DAY_IN_MS

  if (diff < 1) return '30m'
  if (diff < 30) return '3h'
  if (diff < 63) return '6h'
  if (diff < 100) return '12h'
  if (diff < 200) return '1d'
  if (diff < 300) return '2d'
  if (diff < 370) return '3d'
  return '7d'
}

const accessor = ({ getMetric }) => getMetric.data
export function queryPriceData(slug, from, to = 'utc_now') {
  return query(PRICE_QUERY(slug, from, to, normalizeInterval(from))).then(accessor)
}

const INSIGHT_PROJECT = (id, from, to) => `{
  insight(id:${id}) {
    project: priceChartProject {
      slug
      ticker
      priceUsd
      publicationPrice:aggregatedTimeseriesData(metric:"price_usd",from:"${from}",to:"${to}",aggregation:FIRST)
    }
  }
}`
const projectAccessor = ({ insight }) => insight.project
export const queryInsightProject = (id, from, to = 'utc_now') =>
  query(INSIGHT_PROJECT(id, from, to)).then(projectAccessor)
