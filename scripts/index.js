const { moveFiles } = require('./files')
const { preprocessSvelte } = require('./preprocess')

function prepareLib() {
  moveFiles()
  preprocessSvelte()
}

module.exports = {
  prepareLib,
}
