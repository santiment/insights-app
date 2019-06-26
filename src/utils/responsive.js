import { get } from 'svelte/store'
import { stores } from '@sapper/app'

export const getMobileComponent = (mobile, desktop) =>
  get(stores().session).isMobile ? mobile : desktop
