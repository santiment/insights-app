const fs = require('fs')
const mkdirp = require('mkdirp')
const { recursiveList, joinPaths, getPath } = require('./utils')

const noSvgFilter = files => files.filter(file => !file.includes('.svg'))

const ROOT = getPath('..')
const LIB = joinPaths(ROOT, 'lib')
const SRC = joinPaths(ROOT, 'src')

function copyFiles(pathFrom, pathTo, filter = noSvgFilter, maxRec) {
  recursiveList(
    pathFrom,
    pathTo,
    (files, newFrom, newTo) =>
      filter(files).forEach(file =>
        fs.copyFileSync(joinPaths(newFrom, file), joinPaths(newTo, file)),
      ),
    (_, newTo) => mkdirp.sync(newTo),
    maxRec,
  )
}

function moveUi() {
  const PATH_FROM = joinPaths(SRC, 'ui')
  const PATH_TO = joinPaths(LIB, 'ui')

  copyFiles(PATH_FROM, PATH_TO)
  console.log('UI was moved to lib folder!')
}

function moveStaticIcons() {
  const PATH_FROM = joinPaths(ROOT, 'static')
  const PATH_TO = joinPaths(LIB, 'static')

  copyFiles(
    PATH_FROM,
    PATH_TO,
    files => files.filter(file => file.includes('.svg')),
    0,
  )
  console.log('Static files were moved to lib folder!')
}

function moveComments() {
  const comments = ['components', 'comments']
  const PATH_FROM = joinPaths(SRC, ...comments)
  const PATH_TO = joinPaths(LIB, ...comments)

  copyFiles(PATH_FROM, PATH_TO)

  const contextMenu = ['components', 'ContextMenu.svelte']
  fs.copyFileSync(
    joinPaths(SRC, ...contextMenu),
    joinPaths(LIB, ...contextMenu),
  )

  console.log('Comments were moved to lib folder!')
}

function moveUtils() {
  const PATH_FROM = joinPaths(SRC, 'utils')
  const PATH_TO = joinPaths(LIB, 'utils')

  copyFiles(PATH_FROM, PATH_TO)

  console.log('Utils were moved to lib folder!')
}

function moveJs() {
  moveComments()
  moveUtils()
}

function moveUiLib() {
  moveUi()
  moveStaticIcons()
}

module.exports = {
  moveJs,
  moveUiLib,
}
