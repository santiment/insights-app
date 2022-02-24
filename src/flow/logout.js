import { logoutMutation } from '@/api/user'
import { currentUser } from '@/stores/user'

export function startLogoutFlow() {
  currentUser.set(null)
  return logoutMutation()
}
