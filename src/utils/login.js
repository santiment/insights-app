import { stores } from '@sapper/app'
import { client } from '@/apollo'
import { user } from '@/stores/user'
import { notifications } from '@/stores/notifications'
import * as web3Helpers from '@/utils/web3'
import { ETH_LOGIN_QUERY, LOGOUT_MUTATION } from '@/gql/login'

const loginWithEthereum = () => {
  let address = ''
  return web3Helpers
    .getAccount()
    .then(addr => {
      address = addr
      return addr
    })
    .then(web3Helpers.signMessage)
    .then(({ messageHash, signature }) => {
      return client.mutate({
        mutation: ETH_LOGIN_QUERY,
        variables: {
          signature,
          address,
          messageHash,
        },
      })
    })
}

export const handleEthLogin = consent =>
  loginWithEthereum()
    .then(({ data: { ethLogin } }) => {
      user.set(ethLogin.user)
      notifications.add({
        type: 'success',
        title: 'You are logged in!',
      })
    })
    .then(() => {
      const { session } = stores()
      session.update(ses => ({ ...ses, isLoggedIn: true }))
    })
    .catch(console.warn)

export const logout = () =>
  client
    .mutate({ mutation: LOGOUT_MUTATION })
    .then(() => {
      const { session } = stores()
      session.update(ses => ({ ...ses, isLoggedIn: false }))
    })
    .catch(console.warn)
