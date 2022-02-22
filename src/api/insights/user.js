import { query, newSSRQuery, mutate } from 'webkit/api'
import { accessor, INSIGHT_FRAGMENT, BASIC_INSIGHT_FRAGMENT } from './index'

const NO_CACHE = { cache: false }

const CURRENT_USER_INSIGHTS_QUERY = (page) => `{
    currentUser {
      insights(page:${page},pageSize:10) {
        ${INSIGHT_FRAGMENT}
        pulseText
        isPulse
        readyState
      }
    }
  }`

const currentUserAccessor = ({ currentUser }) => currentUser.insights
export const queryCurrentUserInsights = (page, reqOptions) =>
  query(CURRENT_USER_INSIGHTS_QUERY(page), NO_CACHE, reqOptions).then(currentUserAccessor)

export const queryCurrentUserInsightsSSR = newSSRQuery(queryCurrentUserInsights)

// --------------------------------------
const DRAFT_INSIGHTS_QUERY = (page) => `{
    currentUser {
      insights(page:${page},pageSize:10) {
        id
        title
        text
        pulseText
        updatedAt
        readyState
      }
    }
  }`
export const queryDraftInsights = (page, reqOptions) =>
  query(DRAFT_INSIGHTS_QUERY(page), NO_CACHE, reqOptions).then(currentUserAccessor)

export const queryDraftInsightsSSR = newSSRQuery(queryDraftInsights)

// --------------------------------------

const SUGGESTED_USER_INSIGHTS_QUERY = (id) => `{
  insights:allInsightsForUser(userId:${id},pageSize:10){
    ${BASIC_INSIGHT_FRAGMENT}
  }
}`

export const querySuggestedUserInsights = (userId) =>
  query(SUGGESTED_USER_INSIGHTS_QUERY(userId)).then(accessor)

// --------------------------------------

const DELETE_INSIGHT_MUTATION = (id) => `
  mutation {
    deleteInsight(id:${id}) {
      id
    }
  }
`
export const mutateDeleteDraft = (id) => mutate(DELETE_INSIGHT_MUTATION(id))
