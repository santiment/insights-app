import { writable } from 'svelte/store'
import { mutate } from 'webkit/api'
import { getSavedJson, saveJson } from 'webkit/utils/localStorage'
import { getSessionValue } from './utils'

const TOGGLE_THEME_MUTATION = (isNightMode) => `
  mutation updateUserSettings {
    updateUserSettings(settings: { theme: "${isNightMode ? 'nightmode' : ''}" }) {
      theme
    }
  }
`

let store = { nightMode: false }

if (process.browser) {
  const { currentUser, theme } = getSessionValue()

  if (currentUser) {
    store.nightMode = theme === 'night-mode'
  } else {
    store = getSavedJson('ui', store)
  }

  document.body.classList.toggle('night-mode', store.nightMode)
}

const { subscribe, set } = writable(store)
export const ui = {
  subscribe,
  toggleNightMode() {
    const { currentUser } = getSessionValue()
    store.nightMode = document.body.classList.toggle('night-mode')

    if (currentUser) {
      mutate(TOGGLE_THEME_MUTATION(store.nightMode)).catch(console.error)
    }

    saveJson('ui', store)

    set(store)
  },
}
