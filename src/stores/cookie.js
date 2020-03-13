import { writable } from 'svelte/store'

const COOKIE_POLICY_ACCEPTED = 'COOKIE_POLICY_ACCEPTED'

let defaultState = true

if (process.browser) {
  defaultState = localStorage.getItem(COOKIE_POLICY_ACCEPTED)
}

function createCookieStore() {
  const { subscribe, set } = writable(defaultState)

  return {
    subscribe,
    accept() {
      set(true)
      localStorage.setItem(COOKIE_POLICY_ACCEPTED, '+')
    },
  }
}

export const cookie = createCookieStore()
