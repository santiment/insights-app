import gql from 'graphql-tag'

export const userFragment = gql`
  fragment userFragment on User {
    id
    email
    username
    privacyPolicyAccepted
    marketingAccepted
    avatarUrl
    sanBalance
    following {
      users {
        id
      }
    }
    subscriptions {
      id
      trialEnd
      plan {
        id
        name
        product {
          id
        }
      }
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      ...userFragment
    }
  }
  ${userFragment}
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

export const NEWSLETTER_SUBSCRIPTION_MUTATION = gql`
  mutation changeNewsletterSubscription(
    $subscription: NewsletterSubscriptionType
  ) {
    changeNewsletterSubscription(newsletterSubscription: $subscription) {
      newsletterSubscription
    }
  }
`
