import gql from 'graphql-tag'

export const insightCommon = gql`
  fragment insightCommon on Post {
    readyState
    id
    title
    createdAt
    publishedAt
    updatedAt
    tags {
      name
    }
    votedAt
    votes {
      totalVotes
    }
    user {
      id
      username
    }
    __typename
  }
`

export const ALL_INSIGHTS_BY_PAGE_QUERY = gql`
  query allInsights($page: Int) {
    insights: allInsights(page: $page, pageSize: 10) {
      ...insightCommon
    }
  }
  ${insightCommon}
`

export const INSIGHTS_BY_USERID_QUERY = gql`
  query allInsightsForUser($id: Int!) {
    insights: allInsightsForUser(userId: $id) {
      ...insightCommon
    }
  }
  ${insightCommon}
`

export const ALL_INSIGHTS_BY_TAG_QUERY = gql`
  query allInsightsByTag($tag: String!) {
    insights: allInsightsByTag(tag: $tag) {
      ...insightCommon
    }
  }
  ${insightCommon}
`

export const FEATURED_INSIGHTS_QUERY = gql`
  query featuredInsights {
    insights: featuredInsights {
      ...insightCommon
    }
  }
  ${insightCommon}
`

export const INSIGHT_BY_ID_QUERY = gql`
  query insightById($id: ID!) {
    insight: post(id: $id) {
      ...insightCommon
      text
    }
  }

  ${insightCommon}
`
