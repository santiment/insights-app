import { currentUser } from '@/stores/user'
import { ethLoginMutation } from '@/api/login'

export function startEthLoginFlow() {
  return ethLoginMutation()
    .then(({ ethLogin }) => {
      currentUser.set(ethLogin.user)
    })
    .catch((e) => {
      console.error(e)
      return Promise.reject(e)
    })
}
