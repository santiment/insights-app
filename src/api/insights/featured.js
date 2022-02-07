import { query, newSSRQuery } from 'webkit/api'

// TODO(vanguard): ask backend to add `size`(limit) option and sort by publish
const FEATURED_INSIGHTS = `{
  insights:featuredInsights {
    id
    title
    isPro:isPaywallRequired
    user {
      id
      username
    }
  }
}`

const accessor = ({ insights }) => insights.slice(0, 5)
export const queryFeaturedInsights = (reqOptions) =>
  query(FEATURED_INSIGHTS, undefined, reqOptions).then(accessor)

export const queryFeaturedInsightsSSR = newSSRQuery(queryFeaturedInsights)
