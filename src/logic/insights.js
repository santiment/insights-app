import { client } from '@/apollo'
import {
  ALL_INSIGHTS_BY_PAGE_QUERY,
  PULSE_INSIGHTS_BY_PAGE_QUERY,
} from '@/gql/insights'

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

export const postponePayment = () =>
  localStorage.setItem(POSTPONED_PAYMENT_INSIGHT, window.location.pathname)

export const getPostponedPaymentInsight = () =>
  localStorage.getItem(POSTPONED_PAYMENT_INSIGHT)

export const removePostponedPayment = () =>
  localStorage.removeItem(POSTPONED_PAYMENT_INSIGHT)
