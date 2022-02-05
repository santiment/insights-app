import { stores } from '@sapper/app'
import { subscribe } from 'svelte/internal'
import { derived } from 'svelte/store'

export const user$ = () => derived(stores().session, ($session) => $session.currentUser)

export const currentUser = {
  subscribe(run, invalidate) {
    const { session } = stores()
    return session.subscribe((value) => run(value.currentUser), invalidate)
  },
}
