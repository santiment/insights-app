import { stores } from '@sapper/app'
import { customerData$ } from 'webkit/stores/user'

function getSession() {
  const { session } = stores()
  customerData$.fetched = true

  if (!process.browser) return session

  return customerData$.session || (customerData$.session = session)
}

Object.assign(customerData$, {
  subscribe(run, invalidate) {
    const session = getSession()
    return session.subscribe((value) => run(value.customerData), invalidate)
  },

  set(value) {
    if (!customerData$.session) return

    customerData$.session.update((session) => {
      session.customerData = value
      return session
    })
  },
})

export { customerData$ }
