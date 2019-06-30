import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'

if(!process.browser){
  require('isomorphic-fetch')
}

const authLink = setContext((_, { headers }) => {
  // TODO: handle exception on parse
  return {
    headers: {
      ...headers,
      authorization: null,
    },
  }
})

const httpLink = createHttpLink({
  uri: 'https://api-stage.santiment.net/graphql',
  fetch,
  credentials: 'include',
})

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
})
