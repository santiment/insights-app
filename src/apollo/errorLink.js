import Raven from 'raven-js'
import { onError } from 'apollo-link-error'
import { setupRaven } from '../raven'

if (process.browser) {
  setupRaven()
}

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if (Array.isArray(graphQLErrors)) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const errorMessage = `[GraphQL error]:
          Message: ${JSON.stringify(message)},
          Location: ${JSON.stringify(locations)},
          Path: ${JSON.stringify(path)}`
        if (process.env.NODE_ENV === 'development') {
          console.error(errorMessage)
        }
        if (message !== 'unauthorized' && !/Can't fetch/.test(message)) {
          Raven.captureException(errorMessage)
        }
      })
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[GraphQL error]: ${JSON.stringify(graphQLErrors)}`)
      }
      Raven.captureException(
        `[GraphQL error]: ${JSON.stringify(graphQLErrors)}`,
      )
    }
  }

  if (networkError) {
    if (process.env.NODE_ENV === 'development') {
      console.error(networkError)
    }
    Raven.captureException(`[Network error]: ${networkError}`)
  }
})
