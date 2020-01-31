const { moveFiles } = require('./files')
const { preprocessSvelte } = require('./preprocess')
const { prepareIcons } = require('./icons')
const { getPath } = require('./utils')

function prepareLib() {
  prepareIcons(undefined, getPath('..', 'lib', 'icons'))
  moveFiles()
  preprocessSvelte()
}

module.exports = {
  prepareLib,
}
