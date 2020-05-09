import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'
import { errorLink } from './errorLink'
import { uploadLink } from './uploadLink'
import { httpLink } from './httpLink'
import { authLink } from './authLink'

export const client = new ApolloClient({
  link: from([authLink, errorLink, uploadLink, httpLink]),
  cache: new InMemoryCache(),
})
