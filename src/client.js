import * as sapper from '@sapper/app'
import { startResponsiveController } from 'webkit/responsive'
import { isTrackingEnabled } from 'webkit/analytics'
import { bootIntercom } from 'webkit/analytics/intercom'
import { initTwitterPixel } from 'webkit/analytics/twitter'
import { initGA } from 'webkit/analytics/ga'
import { initAmplitude } from 'webkit/analytics/amplitude'
import { newHeadScript } from 'webkit/analytics/utils'
import { ANON_EVENT } from 'webkit/ui/FollowButton/flow'

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
