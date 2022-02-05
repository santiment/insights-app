import { stores } from '@sapper/app'
import { subscribe } from 'svelte/internal'
import { derived } from 'svelte/store'

export const user$ = () => derived(stores().session, ($session) => $session.currentUser)

function getSession() {
  if (currentUser.session) return currentUser.session
  const { session } = stores()
  return (currentUser.session = session)
}
export const currentUser = {
  subscribe(run, invalidate) {
    const session = getSession()
    return session.subscribe((value) => run(value.currentUser), invalidate)
  },
  set(value) {
    const session = getSession()
    session.update((session) => {
      session.currentUser = value
      return session
    })
  },
}
