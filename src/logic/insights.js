import { client } from '@/apollo'
import {
  ALL_INSIGHTS_BY_PAGE_QUERY,
  ALL_INSIGHTS_BY_TAG_QUERY,
  PULSE_INSIGHTS_BY_PAGE_QUERY,
} from '@/gql/insights'
import { HISTORY_PRICE_QUERY } from '@/gql/metrics'
import { getTimeIntervalFromToday, MONTH } from '@/utils/dates'

const POSTPONED_PAYMENT_INSIGHT = 'POSTPONED_PAYMENT_INSIGHT'

export const buildInsightsGetter = (query) => (variables, apollo = client) =>
  apollo
    .query({
      query,
      variables,
      fetchPolicy: 'network-only',
    })
    .then(({ data }) => data.insights)

export const getAllInsights = buildInsightsGetter(ALL_INSIGHTS_BY_PAGE_QUERY)
export const getPulseInsights = buildInsightsGetter(
  PULSE_INSIGHTS_BY_PAGE_QUERY,
)
export const getInsightsByTag = buildInsightsGetter(ALL_INSIGHTS_BY_TAG_QUERY)

export const postponePayment = () =>
  localStorage.setItem(POSTPONED_PAYMENT_INSIGHT, window.location.pathname)

export const getPostponedPaymentInsight = () =>
  localStorage.getItem(POSTPONED_PAYMENT_INSIGHT)

export const removePostponedPayment = () =>
  localStorage.removeItem(POSTPONED_PAYMENT_INSIGHT)

export const getPeriodSincePublication = (publishDate) =>
  getTimeIntervalFromToday(-2, MONTH, {
    from: new Date(publishDate),
  })

export function getPriceDataSincePublication(ticker, from, to) {
  const arg =
    ticker === 'XRP'
      ? {
          slug: 'ripple',
        }
      : { ticker }

  return client
    .query({
      query: HISTORY_PRICE_QUERY,
      variables: {
        from,
        to,
        interval: '1d',
        ...arg,
      },
    })
    .then(({ data: { historyPrice } }) => {
      if (!historyPrice.length) {
        return Promise.reject(`${ticker} historyPrice has no data`)
      }

      return historyPrice
    })
}
