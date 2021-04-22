import gql from 'graphql-tag'

export const insightCommon = gql`
  fragment insightCommon on Post {
    readyState
    id
    title
    isPaywallRequired
    createdAt
    publishedAt
    updatedAt
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
    __typename
  }
`

export const ALL_INSIGHTS_BY_PAGE_QUERY = gql`
  query allInsights($page: Int, $tags: [String], $isOnlyPro: Boolean) {
    insights: allInsights(
      page: $page
      tags: $tags
      isPaywallRequired: $isOnlyPro
      pageSize: 10
    ) {
      ...insightCommon
      isPulse
      text
    }
  }
  ${insightCommon}
`

export const PULSE_INSIGHTS_BY_PAGE_QUERY = gql`
  query allInsights($page: Int, $tags: [String]) {
    insights: allInsights(
      page: $page
      tags: $tags
      isPulse: true
      pageSize: 10
    ) {
      ...insightCommon
      text
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
  query allInsightsByTag($tag: String!, $isPulse: Boolean) {
    insights: allInsightsByTag(tag: $tag, isPulse: $isPulse) {
      ...insightCommon
      isPulse
      text
    }
  }
  ${insightCommon}
`

export const featuredCommon = gql`
  fragment featuredCommon on Post {
    id
    title
    isPaywallRequired
    publishedAt
    user {
      id
      username
      avatarUrl
    }
    __typename
  }
`

export const FEATURED_INSIGHTS_SMALL_QUERY = gql`
  query featuredInsights {
    insights: featuredInsights {
      ...featuredCommon
    }
  }
  ${featuredCommon}
`

export const FEATURED_INSIGHTS_QUERY = gql`
  query featuredInsights {
    insights: featuredInsights {
      ...featuredCommon
      votedAt
      commentsCount
      votes {
        totalVotes
        currentUserVotes
      }
      user {
        id
        username
      }
    }
  }
  ${featuredCommon}
`

export const INSIGHT_BY_ID_QUERY = gql`
  query insightById($id: Int!) {
    insight(id: $id) {
      ...insightCommon
      text
      isPulse
      priceChartProject {
        id
        name
        ticker
        slug
        logoUrl
        percentChange7d
        priceUsd
      }
    }
  }

  ${insightCommon}
`

export const DELETE_INSIGHT_MUTATION = gql`
  mutation deleteInsight($id: ID!) {
    deleteInsight(id: $id) {
      id
    }
  }
`

export const ALL_TAGS_QUERY = gql`
  query allTags {
    tags: allTags {
      name
    }
  }
`

export const CREATE_INSIGHT_DRAFT_MUTATION = gql`
  mutation createInsight(
    $title: String!
    $text: String
    $tags: [String]
    $isPaywallRequired: Boolean
    $priceChartProjectId: Int
  ) {
    updatedDraft: createInsight(
      title: $title
      text: $text
      tags: $tags
      isPaywallRequired: $isPaywallRequired
      priceChartProjectId: $priceChartProjectId
    ) {
      id
      updatedAt
    }
  }
`

export const UPDATE_INSIGHT_DRAFT_MUTATION = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $text: String
    $tags: [String]
    $isPaywallRequired: Boolean
    $isPulse: Boolean
    $priceChartProjectId: Int
  ) {
    updatedDraft: updateInsight(
      id: $id
      title: $title
      text: $text
      tags: $tags
      isPaywallRequired: $isPaywallRequired
      isPulse: $isPulse
      priceChartProjectId: $priceChartProjectId
    ) {
      id
      updatedAt
    }
  }
`

export const PUBLISH_INSIGHT_DRAFT_MUTATION = gql`
  mutation publishInsight($id: ID!) {
    publishInsight(id: $id) {
      id
    }
  }
`

export const EMPTY_USER_INSIGHTS = gql`
  query currentUser {
    currentUser {
      id
      insights {
        id
      }
    }
  }
`

export const ALL_USER_INSIGHTS = gql`
  query currentUser {
    currentUser {
      id
      insights {
        ...insightCommon
        state
        text
      }
    }
  }
  ${insightCommon}
`

export const POPULAR_AUTHORS_QUERY = gql`
  query popularAuthors {
    popularInsightAuthors {
      id
      username
      avatarUrl
      insightsCount {
        totalCount
      }
    }
  }
`

export const INSIGHTS_QUERY = gql`
  query {
    insights: allInsights(pageSize: 5) {
      id
      title
    }
  }
`

export const INSIGHTS_BY_SEARCH_TERM_QUERY = gql`
  query allInsightsBySearchTerm($searchTerm: String!) {
    insights: allInsightsBySearchTerm(searchTerm: $searchTerm) {
      id
      title
    }
  }
`
