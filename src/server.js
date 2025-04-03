import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import MobileDetect from 'mobile-detect'
import * as sapper from '@sapper/server'
import { queryCurrentUserSSR, queryUserAnnualDiscountSSR } from '@/api/user'
import { loggerMiddleware, logger } from './logger'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const checkIsAccountNightMode = (user) => (user ? user.settings.theme === 'nightmode' : false)

function formatMem(mem) {
  return `${(mem / 1024 / 1024).toFixed(2)}MB`
}

setInterval(() => {
  const used = process.memoryUsage()
  logger.debug(
    `[MEMORY]: RSS=${formatMem(used.rss)}, Heap Used=${formatMem(
      used.heapUsed,
    )}, Heap Total=${formatMem(used.heapTotal)}, External=${formatMem(
      used.external,
    )}, Array Buffers=${formatMem(used.arrayBuffers)}MB`,
  )
}, 10 * 1000)

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
