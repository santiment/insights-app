import { writable } from 'svelte/store'

function createNotifications() {
  const { subscribe, update } = writable(new Set())
  let _id = 0

  return {
    subscribe,
    add: (notification) => {
      _id = _id + 1
      update((notifications) => {
        const newNot = new Set([
          ...notifications,
          {
            id: _id,
            ...notification,
          },
        ])
        return newNot
      })
    },
    remove: (notification) => {
      update((notifications) => {
        const uptaded = new Set(notifications)
        uptaded.delete(notification)
        return uptaded
      })
    },
  }
}

export const notifications = createNotifications()
