import { goto } from '@sapper/app'
import gql from 'graphql-tag'
import { client } from '@/apollo'

const PRIVACY_QUERY = gql`
  mutation updateTermsAndConditions($privacyPolicyAccepted: Boolean) {
    updateTermsAndConditions(privacyPolicyAccepted: $privacyPolicyAccepted) {
      id
      privacyPolicyAccepted
    }
  }
`

export function setGDPR(privacyPolicyAccepted) {
  return client
    .mutate({
      mutation: PRIVACY_QUERY,
      variables: {
        privacyPolicyAccepted,
      },
    })
    .then(
      ({
        data: {
          updateTermsAndConditions: { privacyPolicyAccepted },
        },
      }) => privacyPolicyAccepted && goto('/'),
    )
}

export function checkGDPR(currentUser, app) {
  if (currentUser && !currentUser.privacyPolicyAccepted) {
    if (app) {
      app.redirect(302, '/gdpr')
    }
    return true
  }
  return false
}
