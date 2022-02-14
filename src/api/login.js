import { mutate } from 'webkit/api'
import { CURRENT_USER_FRAGMENT } from './user'
import { signMessage } from '@/utils/web3/index.js'

const EMAIL_LOGIN_MUTATION = (email, consent, subscribeToWeeklyNewsletter) => `
  mutation {
    emailLogin(
      email:"${email}",
      consent:"${consent}",
      subscribeToWeeklyNewsletter:${subscribeToWeeklyNewsletter}
    ) {
      success
    }
  }
`

export const emailLoginMutation = (email, consent = '', subscribeToWeeklyNewsletter = false) =>
  mutate(EMAIL_LOGIN_MUTATION(email, consent, subscribeToWeeklyNewsletter))

// ---------------

const ETH_LOGIN_MUTATION = (signature, address, messageHash) => `
  mutation {
    ethLogin(
      signature: "${signature}"
      address: "${address}"
      messageHash: "${messageHash}"
    ) {
      user {
${CURRENT_USER_FRAGMENT}
      }
    }
  }
`

const EthMutation = (MUTATION) => async () => {
  if (!window.ethereum) return Promise.reject('No metamask found')

  const accounts = await window.ethereum.enable()
  if (!accounts) return Promise.reject()

  const address = accounts[0]
  const { signature, messageHash } = await signMessage(`Login in Santiment with address ${address}`)

  return mutate < T > MUTATION(signature, address, messageHash)
}

export const ethLoginMutation = EthMutation(ETH_LOGIN_MUTATION)
