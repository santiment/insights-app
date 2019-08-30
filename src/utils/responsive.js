import { get } from 'svelte/store'
import { stores } from '@sapper/app'

export const isMobile = () => get(stores().session).isMobile

export const getMobileComponent = (mobile, desktop) =>
  isMobile() ? mobile : desktop
