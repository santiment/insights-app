import { stores } from '@sapper/app'
import { derived, readable } from 'svelte/store'

export const user$ = () =>
  derived(stores().session, $session => $session.currentUser)
