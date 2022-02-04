import * as sapper from '@sapper/app'
import { startResponsiveController } from 'webkit/responsive'
import { bootIntercom } from 'webkit/analytics/intercom'

startResponsiveController()

sapper.start({
  target: document.querySelector('#sapper'),
})

if (process.env.IS_DEV_MODE === false) {
  bootIntercom('cyjjko9u')
}
