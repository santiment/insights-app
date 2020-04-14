import { stores } from '@sapper/app'
import { derived } from 'svelte/store'

export const user$ = () =>
  derived(stores().session, $session => $session.currentUser)
