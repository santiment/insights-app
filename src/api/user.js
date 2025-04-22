import { query, newSSRQuery, mutate } from 'webkit/api'
import { ANNUAL_DISCOUT_FRAGMENT } from 'webkit/stores/user'

export const CURRENT_USER_FRAGMENT = `
    id
    email
    username
    privacyPolicyAccepted
    avatarUrl
    firstLogin
    isEligibleForTrial:isEligibleForSanbaseTrial
    settings {
      theme
    }
    insightsCount {
      totalCount
    }

    subscriptions {
      id
      status
      trialEnd
      plan {
        id
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

const Status = {
  ACTIVE: 'ACTIVE',
  TRIALING: 'TRIALING',
  INCOMPLETE: 'INCOMPLETE',
}

const checkIsActiveSubscription = ({ status } = {}) =>
  status === Status.ACTIVE || status === Status.TRIALING || status === Status.INCOMPLETE

function getPrimarySubscription(subscriptions) {
  const businessSubscription = subscriptions.find(
    (subscription) =>
      checkIsActiveSubscription(subscription) && subscription.plan.product.id === '1',
  )

  if (businessSubscription) {
    return businessSubscription
  }

  return subscriptions.find(
    (subscription) =>
      checkIsActiveSubscription(subscription) && subscription.plan.product.id === '2',
  )
}

export const queryCurrentUser = (reqOptions) =>
  query(CURRENT_USER_QUERY, undefined, reqOptions).then((data) => {
    if (data.currentUser) {
      data.currentUser.subscription = getPrimarySubscription(data.currentUser.subscriptions)
    }

    return data
  })

export const queryCurrentUserSSR = newSSRQuery(queryCurrentUser)

// ---------

export const USER_ANNUAL_DISCOUNT = `{${ANNUAL_DISCOUT_FRAGMENT}}`

export const queryUserAnnualDiscount = (reqOptions) =>
  query(USER_ANNUAL_DISCOUNT, undefined, reqOptions)

export const queryUserAnnualDiscountSSR = newSSRQuery(queryUserAnnualDiscount)

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
