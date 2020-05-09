import { setContext } from 'apollo-link-context'

export const authLink = setContext((_, { headers }) => {
  // TODO: handle exception on parse
  return {
    headers: {
      ...headers,
      authorization: null,
    },
  }
})
