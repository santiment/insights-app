import { writable } from 'svelte/store'

let uiDefault = {
  darkMode: false,
  betaMode: false,
}

if (process.browser) {
  uiDefault = JSON.parse(localStorage.getItem('ui')) || {}

  if (uiDefault.darkMode) {
    document.body.classList.add('night-mode')
  }
}

function saveToLS(state) {
  localStorage.setItem('ui', JSON.stringify(state))
}

function createDarkModeToggle() {
  const { subscribe, update } = writable(uiDefault)

  return {
    subscribe,
    toggleDarkMode() {
      const res = document.body.classList.toggle('night-mode')
      update(str => {
        str.darkMode = res
        saveToLS(str)
        return str
      })
    },
    toggleBetaMode() {
      update(str => {
        str.betaMode = !str.betaMode
        saveToLS(str)
        return str
      })
    },
  }
}

export const ui = createDarkModeToggle()
