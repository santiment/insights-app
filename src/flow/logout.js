import { currentUser } from '@/stores/user'

export function startLogoutFlow() {
  currentUser.set(null)
  /*
  return logoutMutation()
    .then(() => {
      currentUser.set(null)
    })
    .catch((e) => {
      console.error(e)
    })
    */
}
