import { query, newSSRQuery } from 'webkit/api'
import { Cache } from 'webkit/api/cache'
import { RELATED_PROJECT_FRAGMENT } from '@/api/insights/project'

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

const ALL_INSIGHTS = (page = 1, tags, isOnlyPro = false, isOnlyPulse = undefined) => {
  if (typeof tags === 'string') tags = tags.toUpperCase()
  else if (Array.isArray(tags)) tags = tags.map((tag) => tag.toUpperCase())

  tags = tags ? `,tags:${JSON.stringify(tags)}` : ''
  isOnlyPulse = isOnlyPulse !== undefined ? `,isPulse:${isOnlyPulse}` : ''

  return `
  {
    insights: allInsights(page:${page}${
    isOnlyPro ? ',isPaywallRequired:true' : ''
  },pageSize:10${tags}${isOnlyPulse}) {
      ${INSIGHT_FRAGMENT}
      pulseText
      isPulse
    }
  }
`
}

export const accessor = ({ insights }) => insights
export const queryAllInsights = (page, tags, isOnlyPro, isOnlyPulse, reqOptions) =>
  query(ALL_INSIGHTS(page, tags, isOnlyPro, isOnlyPulse), undefined, reqOptions).then(accessor)

export const queryAllInsightsSSR = newSSRQuery(queryAllInsights)

// --------------------------------------

const INSIGHT_QUERY = (id, data = '') => `{
  insight(id:${id}) {
    ${INSIGHT_FRAGMENT}
    ${data}
    readyState
    updatedAt
    text
  }
}`

const insightAccessor = ({ insight }) => insight
export const queryInsight = (id, queryFragments = '', reqOptions) =>
  query(INSIGHT_QUERY(id, queryFragments), undefined, reqOptions).then(insightAccessor)

export const queryInsightSSR = newSSRQuery(queryInsight)

export const clearQueryInsightCache = (id, isMobile) =>
  Cache.delete(INSIGHT_QUERY(id, isMobile ? undefined : RELATED_PROJECT_FRAGMENT))
