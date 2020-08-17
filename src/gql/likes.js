import gql from 'graphql-tag'

export const UNLIKE_INSIGHT_MUTATION = gql`
  mutation unvote($id: Int!) {
    unvote(insightId: $id) {
      votedAt
    }
  }
`

export const LIKE_INSIGHT_MUTATION = gql`
  mutation vote($id: Int!) {
    vote(insightId: $id) {
      votedAt
    }
  }
`
