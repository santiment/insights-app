import { query } from 'san-webkit/lib/api'
import { ONE_DAY_IN_MS } from 'san-webkit/lib/utils/dates'
import { offsetStartDate } from './../../../api/insights/project'

export const querySignals = (id) =>
  window
    .fetch(
      `https://sanr-l2-api.production.internal.santiment.net/api/v1/leaderboards/forecasts?filter=%22sanbaseInsight%22:%22${id}%22&take=4`,
    )

    .then((res) => res.json())

export function querySignalsProjectData(signals) {
  return Promise.all(
    signals.map((signal) => {
      const [ticker, pair] = signal.symbol.split('/')
      return queryProjectByTicker(ticker).then((project) => {
        return Object.assign(signal, project, { metric: 'price_' + pair.toLowerCase() })
      })
    }),
  )
}

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
  if (diff < 10) return '2h'
  if (diff < 30) return '3h'
  if (diff < 63) return '4h'
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
