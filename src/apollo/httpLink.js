import { createHttpLink } from 'apollo-link-http'

if (!process.browser) {
  require('isomorphic-fetch')
}

export const httpLink = createHttpLink({
  uri: process.env.BACKEND_URL + '/graphql',
  fetch,
  credentials: 'include',
})
