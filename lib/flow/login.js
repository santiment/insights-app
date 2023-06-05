import { notifications$ as notifications } from 'san-webkit/lib/ui/Notifications'
import { currentUser } from './../stores/user'
import { customerData$ } from './../stores/customerData'
import { ethLoginMutation } from './../api/login'

export function startEthLoginFlow() {
  return ethLoginMutation()
    .then(({ ethLogin }) => {
      currentUser.set(ethLogin.user)
      customerData$.refetch()

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
