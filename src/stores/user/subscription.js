import { stores } from '@sapper/app'
import { derived, readable } from 'svelte/store'
import { getCurrentSanbaseSubscription } from '@/utils/plans'

export const subscription$ = () =>
  derived(stores().session, $session =>
    getCurrentSanbaseSubscription($session.currentUser),
  )
