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

const copyFolder = (base) => (arrayPath, filter, maxRec) =>
  copyFiles(
    joinPaths(base, ...arrayPath),
    joinPaths(LIB, ...arrayPath),
    filter,
    maxRec,
  )

const copyFolderFromSrc = copyFolder(SRC)
const copyFolderFromRoot = copyFolder(ROOT)
const copyFile = (arrayPath) =>
  fs.copyFileSync(joinPaths(SRC, ...arrayPath), joinPaths(LIB, ...arrayPath))

function moveUi() {
  copyFolderFromSrc(['ui'])
  console.log('UI was moved to lib folder!')
}

function moveStaticIcons() {
  copyFolderFromRoot(
    ['static'],
    (files) => files.filter((file) => file.includes('.svg')),
    0,
  )
  console.log('Static files were moved to lib folder!')
}

function moveComponents() {
  copyFolderFromSrc(['components', 'comments'])
  copyFolderFromSrc(['components', 'insights'])

  copyFile(['components', 'ContextMenu.svelte'])
  copyFile(['components', 'ProfileInfo.svelte'])

  copyFile(['components', 'LikeBtn.svelte'])
  copyFile(['components', 'RocketMoonBtn.svelte'])

  console.log('Components were moved to lib folder!')
}

function moveStores() {
  copyFolderFromSrc(['stores'])
  console.log('Stores were moved to lib folder!')
}

function moveUtils() {
  copyFolderFromSrc(['utils'])
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
