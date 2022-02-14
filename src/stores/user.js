import { stores } from '@sapper/app'
import { derived } from 'svelte/store'

export const user$ = () => derived(stores().session, ($session) => $session.currentUser)

function getSession() {
  const { session } = stores()
  if (!process.browser) return session

  return store.session || (store.session = session)
}
const store = {
  subscribe(run, invalidate) {
    const session = getSession()
    return session.subscribe((value) => run(value.currentUser), invalidate)
  },
  set(value) {
    if (!store.session) return

    store.session.update((session) => {
      session.currentUser = value
      return session
    })
  },
}

export const currentUser = store
