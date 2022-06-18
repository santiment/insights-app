import { query, newSSRQuery, mutate } from 'webkit/api'
// import { ANNUAL_DISCOUT_FRAGMENT } from 'webkit/stores/user'

export const CURRENT_USER_FRAGMENT = `
    id
    email
    username
    privacyPolicyAccepted
    avatarUrl
    isEligibleForTrial:isEligibleForSanbaseTrial
    settings {
      theme
    }
    insightsCount {
      totalCount
    }
    subscription: primaryUserSanbaseSubscription {
      status
      trialEnd
      plan {
        name
        product {
          id
        }
      }
    }
    following {
      users {
        id
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

// ---------

const LOGOUT_MUTATION = `
  mutation {
    logout {
      success
    }
  }
`

export const logoutMutation = () => mutate(LOGOUT_MUTATION)

// -------

const VERIFY_EMAIL_MUTATION = (email, token) => `
  mutation {
    verify:emailLoginVerify(email:"${email}", token:"${token}") {
      user {
        ${CURRENT_USER_FRAGMENT}
      }
    }
  }
`
const verificationAccessor = ({ verify }) => verify.user
export const verifyEmailMutation = (email, token) =>
  mutate(VERIFY_EMAIL_MUTATION(email, token)).then(verificationAccessor)

// ---------------

const CHANGE_USERNAME_MUTATION = (username) => `
  mutation {
    changeUsername(username:"${username}") {
      id
    }
  }
`
export const mutateChangeUsername = (username) => mutate(CHANGE_USERNAME_MUTATION(username))
