import { logoutMutation } from '@/api/user'
import { currentUser } from '@/stores/user'
import { customerData$ } from '@/stores/customerData'

export function startLogoutFlow() {
  currentUser.set(null)
  customerData$.setDefault()
  return logoutMutation()
}
