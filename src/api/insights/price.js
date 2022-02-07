import { query, newSSRQuery } from 'webkit/api'

export const PRICE_QUERY = (slug, from, to, interval = '1d') => `
{
  getMetric(metric:"price_usd") {
    timeseriesData(slug:"${slug}",from:"${from}",to:"${to}",interval:"${interval}") {
      d: datetime,
      v: value
    }
  }
}
`

const accessor = ({ getMetric }) => getMetric.timeseriesData
export const queryPriceData = (slug, from, to = 'utc_now') =>
  query(PRICE_QUERY(slug, from, to)).then(accessor)
