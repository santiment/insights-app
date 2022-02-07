import { query, newSSRQuery } from 'webkit/api'
import { ONE_DAY_IN_MS } from 'webkit/utils/dates'

const PRICE_QUERY = (slug, from, to, interval = '1d') => `{
  getMetric(metric:"price_usd") {
    firstPrice:aggregatedTimeseriesData(slug:"${slug}",from:"${from}",to:"${to}",aggregation:FIRST)

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

function precacher(data) {
  const items = data.getMetric.data
  for (let i = items.length - 1; i > -1; i--) {
    const item = items[i]
    item.d = +new Date(item.d)
  }
  return data
}
const options = { precacher: () => precacher }
const accessor = ({ getMetric }) => getMetric
export function queryPriceData(slug, from, to = 'utc_now') {
  return query(PRICE_QUERY(slug, from, to, normalizeInterval(from)), options).then(accessor)
}

const INSIGHT_PROJECT = (id) => `{
  insight(id:${id}) {
    project: priceChartProject {
      slug
      ticker
      priceUsd
    }
  }
}`
const projectAccessor = ({ insight }) => insight.project
export const queryInsightProject = (id) => query(INSIGHT_PROJECT(id)).then(projectAccessor)
