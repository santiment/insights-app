import { query, newSSRQuery } from 'webkit/api'

export const INSIGHT_FRAGMENT = `
  id
  title
  isPaywallRequired
  publishedAt
  tags {
    name
  }
  commentsCount
  votedAt
  votes {
    totalVotes
    currentUserVotes
  }
  user {
    id
    username
    avatarUrl
  }
`

// TODO(vanguard): ask to add `pulseText` field
const ALL_INSIGHTS = (page = 1, tags, isOnlyPro = false) => {
  tags = tags ? `,tags:${JSON.stringify(tags)}` : ''

  return `
  {
    insights: allInsights(page:${page},isPaywallRequired:${isOnlyPro},pageSize:10${tags}) {
      ${INSIGHT_FRAGMENT}
      isPulse
    }
  }
`
}

const accessor = ({ insights }) => insights
export const queryAllInsights = (page, tags, isOnlyPro, reqOptions) =>
  query(ALL_INSIGHTS(page, tags, isOnlyPro), undefined, reqOptions).then(accessor)

export const queryAllInsightsSSR = newSSRQuery(queryAllInsights)
