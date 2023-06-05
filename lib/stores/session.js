import { stores } from '@sapper/app'

function getSession() {
  const value = stores().session
  if (!process.browser) return value

  return session.value || (session.value = value)
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
