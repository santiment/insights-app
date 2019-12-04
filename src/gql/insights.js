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
      avatarUrl
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
      id
      title
      publishedAt
      votedAt
      votes {
        totalVotes
      }
      user {
        id
        username
      }
    }
  }
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
  mutation createPost($title: String!, $text: String, $tags: [String]) {
    updatedDraft: createPost(title: $title, text: $text, tags: $tags) {
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
  ) {
    updatedDraft: updatePost(id: $id, title: $title, text: $text, tags: $tags) {
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
