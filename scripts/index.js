const mkdirp = require('mkdirp')
const { moveJs, moveUiLib } = require('./files')
const { preprocessSvelte, makeStaticIconsImported } = require('./preprocess')
const { prepareIcons } = require('./icons')
const { getPath, joinPaths } = require('./utils')

const ROOT = getPath('..')
const LIB = joinPaths(ROOT, 'lib')
const SRC = joinPaths(ROOT, 'src')

function prepareLib() {
  mkdirp.sync(LIB)

  moveJs()
  moveUiLib()
  makeStaticIconsImported()
  preprocessSvelte()
  prepareIcons(undefined, joinPaths(LIB, 'icons'))
}

module.exports = {
  prepareLib,
}
