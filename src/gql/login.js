import gql from 'graphql-tag'
import { userFragment } from '@/gql/user'

export const EMAIL_REGISTRATION = gql`
  mutation(
    $email: String!
    $consent: String!
    $subscribeToWeeklyNewsletter: Boolean
  ) {
    emailLogin(
      email: $email
      consent: $consent
      subscribeToWeeklyNewsletter: $subscribeToWeeklyNewsletter
    ) {
      success
    }
  }
`

export const VERIFY_EMAIL_MUTATION = gql`
  mutation emailLoginVerify($email: String!, $token: String!) {
    emailLoginVerify(email: $email, token: $token) {
      token
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`

export const ETH_LOGIN_QUERY = gql`
  mutation ethLogin(
    $signature: String!
    $address: String!
    $messageHash: String!
  ) {
    ethLogin(
      signature: $signature
      address: $address
      messageHash: $messageHash
    ) {
      token
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      success
    }
  }
`
