import * as sapper from '@sapper/app'
import { startResponsiveController } from 'san-webkit/lib/responsive'
import { isTrackingEnabled } from 'san-webkit/lib/analytics'
import { bootIntercom } from 'san-webkit/lib/analytics/intercom'
import { initTwitterPixel } from 'san-webkit/lib/analytics/twitter'
import { initGA } from 'san-webkit/lib/analytics/ga'
import { initAmplitude } from 'san-webkit/lib/analytics/amplitude'
import { newHeadScript } from 'san-webkit/lib/analytics/utils'
import { trackAppOpen } from 'san-webkit/lib/analytics/events/general'
import { ANON_EVENT } from 'san-webkit/lib/ui/FollowButton/flow'

window.__SESSION__ = window.__SAPPER__.session

startResponsiveController()

sapper.start({
  target: document.querySelector('#sapper'),
})

if (process.env.IS_PROD_MODE && process.env.IS_PROD_BACKEND) {
  bootIntercom('cyjjko9u')

  if (isTrackingEnabled) {
    initGA('UA-100571693-11')
    newHeadScript('gtag("config", "UA-100571693-1");')
    initTwitterPixel()
    initAmplitude()
  }
}

const APP_LINK = 'https://insights.santiment.net'
window.__onLinkClick = (e) => {
  if (typeof e === 'string') {
    return sapper.goto(e)
  }

  const node = e.currentTarget
  if (!node) return

  const href = node.getAttribute('href')
  if (!href) return

  e.preventDefault()

  if (href.startsWith('/profile/')) {
    window.location.href = 'https://app.santiment.net' + href
  } else if (href.startsWith(APP_LINK) || href.startsWith('/')) {
    sapper.goto(href.replace(APP_LINK, ''))
  } else {
    window.location.href = href
  }
}

window.addEventListener(ANON_EVENT, () => sapper.goto('/login'))

trackAppOpen()
