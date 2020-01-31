const fs = require('fs')
const mkdirp = require('mkdirp')
const { recursiveList, joinPaths, getPath } = require('./utils')

const noSvgFilter = files => files.filter(file => !file.includes('.svg'))

function copyFiles(pathFrom, pathTo) {
  recursiveList(
    pathFrom,
    pathTo,
    (files, newFrom, newTo) =>
      noSvgFilter(files).forEach(file =>
        fs.copyFileSync(joinPaths(newFrom, file), joinPaths(newTo, file)),
      ),
    (_, newTo) => mkdirp.sync(newTo),
  )
}

function moveUi() {
  const PATH_FROM = getPath('..', 'src', 'ui')
  const PATH_TO = getPath('..', 'lib', 'ui')

  copyFiles(PATH_FROM, PATH_TO)
  console.log('UI was moved to lib folder!')
}

function moveComments() {
  const comments = ['components', 'comments']
  const PATH_FROM = getPath('..', 'src', ...comments)
  const PATH_TO = getPath('..', 'lib', ...comments)

  copyFiles(PATH_FROM, PATH_TO)
  console.log('Comments were moved to lib folder!')
}

function moveFiles() {
  moveUi()
  moveComments()
}

module.exports = {
  moveFiles,
}
