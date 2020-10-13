const fs = require('fs')
const mkdirp = require('mkdirp')
const { recursiveList, joinPaths, getPath } = require('./utils')

const noSvgFilter = (files) => files.filter((file) => !file.includes('.svg'))

const ROOT = getPath('..')
const LIB = joinPaths(ROOT, 'lib')
const SRC = joinPaths(ROOT, 'src')

const openFile = (dir, filename) =>
  fs.readFileSync(joinPaths(dir, filename), 'utf8')

function copyFilesWithCustomImports(from, to) {
  recursiveList(
    from,
    to,
    (files, _, newPath) => {
      files.forEach((filename) => {
        const anchor = "from '@/"
        let source = openFile(from, filename)
        let startIndex = 0

        while (true) {
          startIndex = source.indexOf(anchor, startIndex)
          if (startIndex === -1) break

          startIndex += anchor.length - 2
          const moduleEndIndex = source.indexOf("'", startIndex)
          const module = source.slice(startIndex, moduleEndIndex)

          if (module === '@/apollo') {
            startIndex = moduleEndIndex + 1
          } else {
            const modulePath = LIB + module.slice(1)
            source = source.replace(module, modulePath)
            startIndex += modulePath.length + 1
          }
        }

        fs.writeFileSync(joinPaths(newPath, filename), source, 'utf8')
      })
    },

    (_, newTo) => mkdirp.sync(newTo),
  )
}

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
  copyFile(['components', 'MultilineText.svelte'])

  console.log('Components were moved to lib folder!')
}

function moveStores() {
  copyFolderFromSrc(['stores'])
  console.log('Stores were moved to lib folder!')
}

function moveUtils() {
  copyFilesWithCustomImports(joinPaths(SRC, 'utils'), joinPaths(LIB, 'utils'))
  console.log('Utils were moved to lib folder!')
}

function moveLogic() {
  copyFilesWithCustomImports(joinPaths(SRC, 'logic'), joinPaths(LIB, 'logic'))
  console.log('Logic files was moved to lib folder!')
}

function moveGql() {
  copyFilesWithCustomImports(joinPaths(SRC, 'gql'), joinPaths(LIB, 'gql'))
  console.log('Gql files were moved to lib folder!')
}

function moveJs() {
  moveComponents()
  moveUtils()
  moveStores()
  moveLogic()
  moveGql()
}

function moveUiLib() {
  moveUi()
  moveStaticIcons()
}

module.exports = {
  moveJs,
  moveUiLib,
}
