import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import MobileDetect from 'mobile-detect'
import * as sapper from '@sapper/server'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

const dev = process.env.NODE_ENV === 'development'

function getServerContext(req) {
  return {
    apollo: new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: process.env.BACKEND_URL + '/graphql',
        headers: {
          origin: 'https://app.santiment.net',
          cookie: req.headers.cookie,
          'x-forwarded-for':
            req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        },
        fetch,
        credentials: 'include',
      }),
      cache: new InMemoryCache({
        //addTypename: false,
      }),
    }),
  }
}

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      serverContext: getServerContext,
      session: (req) => {
        return {
          isMobile: new MobileDetect(req.headers['user-agent']).mobile(),
        }
      },
    }),
  )
  .listen(process.env.PORT, (err) => {
    if (err) console.log('error', err)
  })
