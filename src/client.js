import * as sapper from '@sapper/app'
import { startResponsiveController } from 'webkit/responsive'
import { isTrackingEnabled } from 'webkit/analytics'
import { bootIntercom } from 'webkit/analytics/intercom'
// import { initTwitterPixel } from 'webkit/analytics/twitter'
import { initGA } from 'webkit/analytics/ga'
import { initAmplitude } from 'webkit/analytics/amplitude'
import { newHeadScript } from 'webkit/analytics/utils'
import { trackAppOpen } from 'webkit/analytics/events/general'
import { ANON_EVENT } from 'webkit/ui/FollowButton/flow'

window.__SESSION__ = window.__SAPPER__.session

startResponsiveController()

sapper.start({
  target: document.querySelector('#sapper'),
})

if (process.env.IS_PROD_MODE && process.env.IS_PROD_BACKEND) {
  bootIntercom('cyjjko9u')

  newHeadScript(`(function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://cdn.firstpromoter.com/fprom.js',t.onload=t.onreadystatechange=function(){var t=this.readyState;if(!t||"complete"==t||"loaded"==t)try{$FPROM.init("ks4svmdl",".santiment.net")}catch(t){}};var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)})();
`)

  if (isTrackingEnabled) {
    initGA('UA-100571693-11')
    initGA('G-H53MB0V33X')
    newHeadScript('gtag("config", "UA-100571693-1");')
    newHeadScript('gtag("config", "G-H53MB0V33X");')
    // initTwitterPixel()
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
