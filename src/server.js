import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import MobileDetect from 'mobile-detect'
import * as sapper from '@sapper/server'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'


polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      serverContext: (req, res) => {
        return {
          apollo: new ApolloClient({
            ssrMode: true,
            link: createHttpLink({
              uri: 'https://api-stage.santiment.net/graphql',
              headers: {
                cookie: req.headers.cookie,
              },
              fetch,
              credentials: 'include',
            }),
            cache: new InMemoryCache(),
          }),
        }
      },
      session: (req, res) => {

        const authCookie = '_sanbase_sid='
        const sanCookie =
          req.headers.cookie &&
          req.headers.cookie
            .split(' ')
            .find(cookie => cookie.includes('_sanbase_sid='))

        return {
          isMobile: new MobileDetect(req.headers['user-agent']).mobile(),
          isLoggedIn: sanCookie && sanCookie.length > authCookie.length,
        }
      },
    }),
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })

