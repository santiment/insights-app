import gql from 'graphql-tag'
import { insightCommon } from './insights'

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
      insights {
        ...insightCommon
        text
      }
    }
  }
  ${insightCommon}
`
