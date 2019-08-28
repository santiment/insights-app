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
      settings {
        hasTelegramConnected
        newsletterSubscription
        signalNotifyEmail
        signalNotifyTelegram
      }
    }
  }
  ${insightCommon}
`

export const USER_SETTINGS_TELEGRAM_QUERY = gql`
  {
    currentUser {
      id
      settings {
        hasTelegramConnected
      }
    }
  }
`

export const TELEGRAM_DEEP_LINK_QUERY = gql`
  {
    getTelegramDeepLink
  }
`

export const REMOVE_CONNECTED_WALLET_QUERY = gql`
  mutation removeUserEthAddress($address: String!) {
    removeUserEthAddress(address: $address) {
      ethAccounts {
        address
      }
    }
  }
`
