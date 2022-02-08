import { query, newSSRQuery } from 'webkit/api'

export const CURRENT_USER_FRAGMENT = `
    id
    email
    username
    privacyPolicyAccepted
    avatarUrl
    settings {
      theme
    }
    insightsCount {
      totalCount
    }
    subscriptions {
      status
      trialEnd
      plan {
        name
        product {
          id
        }
      }
    }
`

export const CURRENT_USER_QUERY = `
  {
    currentUser {
      ${CURRENT_USER_FRAGMENT}
    }
  }
`

export const queryCurrentUser = (reqOptions) => query(CURRENT_USER_QUERY, undefined, reqOptions)

export const queryCurrentUserSSR = newSSRQuery(queryCurrentUser)
