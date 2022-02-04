import { writable } from 'svelte/store'
import { getSavedJson, saveJson } from 'webkit/utils/localStorage'

let store = { nightMode: false }

if (process.browser) {
  store = getSavedJson('ui', store)

  if (store.nightMode) {
    document.body.classList.add('night-mode')
  }
}

const { subscribe, set } = writable(store)
export const ui = {
  subscribe,
  toggleNightMode() {
    store.nightMode = document.body.classList.toggle('night-mode')
    saveJson('ui', store)
    set(store)
  },
}
