import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      email
      username
      privacyPolicyAccepted
      marketingAccepted
      consent_id
      sanBalance
      following {
        id: userId
      }
      ethAccounts {
        address
        sanBalance
      }
      subscriptions {
        id
        plan {
          id
          name
          product {
            id
          }
        }
      }
    }
  }
`

export const FOLLOW_USER_MUTATION = gql`
  mutation follow($id: ID!) {
    follow(userId: $id) {
      id
    }
  }
`

export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollow($id: ID!) {
    unfollow(userId: $id) {
      id
    }
  }
`
