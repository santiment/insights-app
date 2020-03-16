import { get } from 'svelte/store'
import { stores } from '@sapper/app'

export function getShareLink() {
  const { host, path } = get(stores().page)

  return `https://${host}${path}`
}
