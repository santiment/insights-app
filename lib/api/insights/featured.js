import { query, newSSRQuery } from 'san-webkit/lib/api'
import { BASIC_INSIGHT_FRAGMENT } from '.'

const FEATURED_INSIGHTS = `{
  insights:featuredInsights(pageSize: 5) {
    id
    title
    isPro:isPaywallRequired
    publishedAt
    user {
      id
      username
    }
  }
}`

const accessor = ({ insights }) => insights

const sorter = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
const precacher = (data) => (data.insights.sort(sorter), data)
const options = { precacher: () => precacher }

export const queryFeaturedInsights = (reqOptions) =>
  query(FEATURED_INSIGHTS, options, reqOptions).then(accessor)

export const queryFeaturedInsightsSSR = newSSRQuery(queryFeaturedInsights)

// --------------

const SUGGESTED_FEATURED_INSIGHTS = `{
  insights:featuredInsights {
    ${BASIC_INSIGHT_FRAGMENT}
  }
}`

export const querySuggestedFeaturedInsights = () =>
  query(SUGGESTED_FEATURED_INSIGHTS).then(accessor)
