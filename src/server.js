import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import MobileDetect from 'mobile-detect'
import * as sapper from '@sapper/server'
import { queryCurrentUserSSR } from '@/api/user'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const checkIsAccountNightMode = (user) => (user ? user.settings.theme === 'nightmode' : false)

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: async (req) => {
        const { currentUser } = await queryCurrentUserSSR({
          req,
        }).catch((e) => {
          console.log(e)
          return { currentUser: null }
        })
        console.log(currentUser)

        const isMobile = !!new MobileDetect(req.headers['user-agent'] || '').mobile()
        const session = {
          currentUser,
          isMobile,
          theme: checkIsAccountNightMode(currentUser) ? 'night-mode' : '',
          isDesktop: !isMobile,
        }

        return session
      },
    }),
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err)
  })
