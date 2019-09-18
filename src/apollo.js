import ApolloClient from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { print } from 'graphql/language/printer'
import { from } from 'apollo-link'

if (!process.browser) {
  require('isomorphic-fetch')
}

const isObject = value => value !== null && typeof value === 'object'
// TODO(vanguard): Replace this legacy with appropriate apollo upload link
const uploadLink = new ApolloLink((operation, forward) => {
  if (typeof FormData !== 'undefined' && isObject(operation.variables)) {
    const files = operation.variables.images
    if (files && files.length > 0) {
      const { headers } = operation.getContext()
      const formData = new FormData()

      const filesData = Object.keys(files).filter(key => {
        return files[key].name
      })
      formData.append('query', print(operation.query))
      let variables = { images: [] }
      filesData.forEach(key => {
        variables['images'].push(files[key].name)
        formData.append(files[key].name, files[key])
      })
      formData.append('variables', JSON.stringify(variables))

      return new Observable(observer => {
        fetch(process.env.BACKEND_URL + '/graphql', {
          method: 'POST',
          headers: {
            ...headers,
          },
          body: formData,
          credentials: 'include',
        })
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText)
            }
            return response.json()
          })
          .then(success => {
            observer.next(success)
            observer.complete()
          })
          .catch(error => {
            observer.next(error)
            observer.error(error)
          })
      })
    }
  }
  return forward(operation)
})

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
  uri: process.env.BACKEND_URL + '/graphql',
  fetch,
  credentials: 'include',
})

export const client = new ApolloClient({
  link: from([authLink, uploadLink, httpLink]),
  cache: new InMemoryCache(),
})
