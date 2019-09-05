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
