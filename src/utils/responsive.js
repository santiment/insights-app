import { get } from 'svelte/store'
import { stores } from '@sapper/app'

export const checkIsMobile = () => get(stores().session).isMobile

export const getMobileComponent = (mobile, desktop) =>
  checkIsMobile() ? mobile : desktop
