import Raven from 'raven-js'

export const setupRaven = () => {
  Raven.config(process.env.RAVEN_DSN, {
    release: process.env.GIT_HEAD,
  }).install()
}
