const fs = require('fs')
const path = require('path')

const joinPaths = (...paths) => path.resolve(...paths)

const getPath = (...paths) => joinPaths(__dirname, ...paths)

const isDir = filePath => fs.statSync(filePath).isDirectory()

const isFile = filePath => fs.statSync(filePath).isFile()

const getFilesAndDirs = dir => {
  const results = fs.readdirSync(dir)

  const files = results.filter(name => isFile(joinPaths(dir, name)))
  const dirs = results.filter(name => isDir(joinPaths(dir, name)))

  return [files, dirs]
}

function recursiveList(
  pathFrom,
  pathTo,
  processFiles,
  onList = () => {},
  maxRec = 10,
) {
  if (maxRec < 0) {
    return
  }

  onList(pathFrom, pathTo)

  const [files, dirs] = getFilesAndDirs(pathFrom)

  processFiles(files, pathFrom, pathTo)

  dirs.forEach(dir =>
    recursiveList(
      joinPaths(pathFrom, dir),
      joinPaths(pathTo, dir),
      processFiles,
      onList,
      maxRec - 1,
    ),
  )
}

module.exports = {
  joinPaths,
  getPath,
  isDir,
  isFile,
  getFilesAndDirs,
  recursiveList,
}
