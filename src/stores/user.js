import { writable } from 'svelte/store'
import { client } from '@/apollo'
import { CURRENT_USER_QUERY } from '@/gql/user'

function createClientStore() {
  const { subscribe, set } = writable(undefined)

  if (process.browser) {
    client
      .query({ query: CURRENT_USER_QUERY })
      .then(({ data: { currentUser } }) => set(currentUser))
  }

  return {
    subscribe,
    set,
  }
}

export const user = createClientStore()
