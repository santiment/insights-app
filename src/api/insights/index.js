import { query, newSSRQuery } from 'webkit/api'

export const BASIC_INSIGHT_FRAGMENT = `
  id
  title
  isPro:isPaywallRequired
  publishedAt
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

export const INSIGHT_FRAGMENT =
  BASIC_INSIGHT_FRAGMENT +
  `
  tags {
    name
  }
`

const ALL_INSIGHTS = (page = 1, tags, isOnlyPro = false) => {
  tags = tags ? `,tags:${JSON.stringify(tags)}` : ''

  return `
  {
    insights: allInsights(page:${page}${
    isOnlyPro ? ',isPaywallRequired:true' : ''
  },pageSize:10${tags}) {
      ${INSIGHT_FRAGMENT}
      pulseText
      isPulse
    }
  }
`
}

const accessor = ({ insights }) => insights
export const queryAllInsights = (page, tags, isOnlyPro, reqOptions) =>
  query(ALL_INSIGHTS(page, tags, isOnlyPro), undefined, reqOptions).then(accessor)

export const queryAllInsightsSSR = newSSRQuery(queryAllInsights)

// --------------------------------------

const INSIGHT_QUERY = (id, data = '') => `{
  insight(id:${id}) {
    ${INSIGHT_FRAGMENT}
    ${data}
    text
  }
}`

const insightAccessor = ({ insight }) => insight
export const queryInsight = (id, queryFragments = '', reqOptions) =>
  query(INSIGHT_QUERY(id, queryFragments), undefined, reqOptions).then(insightAccessor)

export const queryInsightSSR = newSSRQuery(queryInsight)

// --------------------------------------

const SUGGESTED_USER_INSIGHTS_QUERY = (id) => `{
  insights:allInsightsForUser(userId:${id}, pageSize:10){
    ${BASIC_INSIGHT_FRAGMENT}
  }
}`
export const querySuggestedUserInsights = (userId) =>
  query(SUGGESTED_USER_INSIGHTS_QUERY(userId)).then(accessor)
