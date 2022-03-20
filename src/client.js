import * as sapper from '@sapper/app'
import { startResponsiveController } from 'webkit/responsive'
import { bootIntercom } from 'webkit/analytics/intercom'
import { initGA } from 'webkit/analytics/ga'
import { ANON_EVENT } from 'webkit/ui/FollowButton/flow'

startResponsiveController()

sapper.start({
  target: document.querySelector('#sapper'),
})

if (process.env.IS_PROD_MODE) {
  bootIntercom('cyjjko9u')
  initGA('UA-100571693-11')
}

window.__onLinkClick = (e) => {
  const node = e.currentTarget
  const href = node.getAttribute('href')

  if (href.startsWith('/profile/')) {
    e.preventDefault()
    window.location.href = 'https://app.santiment.net' + href
  }
}

window.addEventListener(ANON_EVENT, () => sapper.goto('/login'))
