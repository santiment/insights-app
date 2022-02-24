import { mutate } from 'webkit/api'

const GDPR_MUTATION = (privacyPolicyAccepted) => `
  mutation {
    updateTermsAndConditions(privacyPolicyAccepted:${privacyPolicyAccepted}) {
      privacyPolicyAccepted
    }
  }
`

export const mutateGdpr = (privacyPolicyAccepted) => mutate(GDPR_MUTATION(privacyPolicyAccepted))
