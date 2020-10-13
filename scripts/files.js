const fs = require('fs')
const mkdirp = require('mkdirp')
const { recursiveList, joinPaths, getPath } = require('./utils')

const noSvgFilter = (files) => files.filter((file) => !file.includes('.svg'))

const ROOT = getPath('..')
const LIB = joinPaths(ROOT, 'lib')
const SRC = joinPaths(ROOT, 'src')

function copyFiles(pathFrom, pathTo, filter = noSvgFilter, maxRec) {
  recursiveList(
    pathFrom,
    pathTo,
    (files, newFrom, newTo) =>
      filter(files).forEach((file) =>
        fs.copyFileSync(joinPaths(newFrom, file), joinPaths(newTo, file)),
      ),
    (_, newTo) => mkdirp.sync(newTo),
    maxRec,
  )
}

const copyFolder = (arrayPath, filter, maxRec) =>
  copyFiles(
    joinPaths(...arrayPath),
    joinPaths(LIB, ...arrayPath),
    filter,
    maxRec,
  )

const copyFile = (arrayPath) =>
  fs.copyFileSync(joinPaths(...arrayPath), joinPaths(LIB, ...arrayPath))

function moveUi() {
  copyFolder([SRC, 'ui'])
  console.log('UI was moved to lib folder!')
}

function moveStaticIcons() {
  copyFolder(
    [ROOT, 'static'],
    (files) => files.filter((file) => file.includes('.svg')),
    0,
  )
  console.log('Static files were moved to lib folder!')
}

function moveComponents() {
  copyFolder([SRC, 'components', 'comments'])
  copyFolder([SRC, 'components', 'insights'])

  copyFile([SRC, 'components', 'ContextMenu.svelte'])
  copyFile([SRC, 'components', 'ProfileInfo.svelte'])

  copyFile([SRC, 'components', 'LikeBtn.svelte'])
  copyFile([SRC, 'components', 'RocketMoonBtn.svelte'])

  console.log('Components were moved to lib folder!')
}

function moveStores() {
  copyFolder([SRC, 'stores'])
  console.log('Stores were moved to lib folder!')
}

function moveUtils() {
  copyFolder([SRC, 'utils'])
  console.log('Utils were moved to lib folder!')
}

function moveJs() {
  moveComponents()
  moveUtils()
  moveStores()
}

function moveUiLib() {
  moveUi()
  moveStaticIcons()
}

module.exports = {
  moveJs,
  moveUiLib,
}
