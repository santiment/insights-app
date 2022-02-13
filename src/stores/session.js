import { stores } from '@sapper/app'

function getSession() {
  // if (session.value) return session.value
  return stores().session
  // return (session.value = value)
}
export const session = {
  subscribe(run, invalidate) {
    const session = getSession()
    return session.subscribe(run, invalidate)
  },
  set(value) {
    return getSession().set(value)
  },
  update(value) {
    return getSession().update(value)
  },
}
