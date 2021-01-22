import * as sapper from '@sapper/app'

window.require = (_) => _

sapper.start({
  target: document.querySelector('body'),
})
