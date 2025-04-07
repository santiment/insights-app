import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import MobileDetect from 'mobile-detect'
import * as sapper from '@sapper/server'
import { queryCurrentUserSSR, queryUserAnnualDiscountSSR } from '@/api/user'
import { loggerMiddleware, logger, memUsageMessage } from './logger'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const checkIsAccountNightMode = (user) => (user ? user.settings.theme === 'nightmode' : false)

setInterval(() => logger.debug(memUsageMessage()), 10 * 1000)

polka()
  .use(
    loggerMiddleware,
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: async (req) => {
        const ssr = { req }

        let annualDiscount = {}

        const { currentUser } = await queryCurrentUserSSR(ssr).catch((e) => {
          console.log('CurrentUser error', e)
          return { currentUser: null }
        })

        if (currentUser) {
          annualDiscount = (
            await queryUserAnnualDiscountSSR(ssr).catch(() => ({ annualDiscount: {} }))
          ).annualDiscount
        }

        const isMobile = !!new MobileDetect(req.headers['user-agent'] || '').mobile()
        const session = {
          currentUser,
          customerData: {
            annualDiscount,
            isLoggedIn: !!currentUser,
            isEligibleForTrial: currentUser && currentUser.isEligibleForTrial,
          },
          theme: checkIsAccountNightMode(currentUser) ? 'night-mode' : '',
          isMobile,
          isDesktop: !isMobile,
        }

        return session
      },
    }),
  )
  .listen(PORT, (err) => {
    if (err) logger.error(err)
  })
