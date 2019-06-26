import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import MobileDetect from 'mobile-detect'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => {
        const authCookie = '_sanbase_sid='
        const sanCookie = req.headers.cookie
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
