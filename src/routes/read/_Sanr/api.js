import { query } from 'webkit/api'
import { ONE_DAY_IN_MS } from 'webkit/utils/dates'
import { offsetStartDate } from '@/api/insights/project'

export const querySignals = (id) =>
  window
    .fetch(
      `https://sanr-l2-api.production.internal.santiment.net/api/v1/leaderboards/forecasts?filter=%22sanbaseInsight%22:%22${id}%22`,
    )
    .then((res) => res.json())

const PROJECT_BY_TICKER_QUERY = (ticker) => `{
    allProjectsByTicker(ticker:"${ticker}") { slug logoUrl }
  }`
export const queryProjectByTicker = (ticker) =>
  query(PROJECT_BY_TICKER_QUERY(ticker)).then(({ allProjectsByTicker }) => allProjectsByTicker[0])

const PRICE_QUERY = (metric, slug, from, interval = '1d') => `{
  getMetric(metric:"${metric}") {
    data:timeseriesData(slug:"${slug}",from:"${from}",to:"utc_now",interval:"${interval}") {
      d: datetime,
      v: value
    }
  }
}`

export function normalizeInterval(from) {
  const fromDate = new Date(from)
  const diff = (Date.now() - fromDate) / ONE_DAY_IN_MS

  if (diff < 1) return '15m'
  if (diff < 10) return '1h'
  if (diff < 30) return '2h'
  if (diff < 63) return '3h'
  if (diff < 100) return '6h'
  if (diff < 150) return '1d'
  if (diff < 200) return '2d'
  if (diff < 250) return '3d'
  return '7d'
}

function precacher({ getMetric }) {
  return getMetric.data.map((item) => {
    item.d = Date.parse(item.d)
    return item
  })
}

const options = { precacher: () => precacher }
export function querySignalPrice(metric, slug, date) {
  const from = offsetStartDate(date).toISOString()

  return query(PRICE_QUERY(metric, slug, from, normalizeInterval(from)), options)
}
