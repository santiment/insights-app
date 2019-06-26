import gql from 'graphql-tag'

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      success
    }
  }
`

export const EMAIL_REGISTRATION = gql`
  mutation($email: String!, $consent: String!) {
    emailLogin(email: $email, consent: $consent) {
      success
    }
  }
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
        id
        email
        username
        sanBalance
        privacyPolicyAccepted
        marketingAccepted
        ethAccounts {
          address
          sanBalance
        }
      }
    }
  }
`
