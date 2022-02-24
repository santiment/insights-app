import { notifications } from 'webkit/ui/Notifications'
import { currentUser } from '@/stores/user'
import { ethLoginMutation } from '@/api/login'

export function startEthLoginFlow() {
  return ethLoginMutation()
    .then(({ ethLogin }) => {
      currentUser.set(ethLogin.user)

      notifications.show({
        type: 'success',
        title: 'You are logged in!',
      })
    })
    .catch((e) => {
      console.error(e)
      return Promise.reject(e)
    })
}
