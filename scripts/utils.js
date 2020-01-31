import fs from 'fs'
import path from 'path'

export const joinPaths = (...paths) => path.resolve(...paths)

export const getPath = (...paths) => joinPaths(__dirname, ...paths)

export const isDir = filePath => fs.statSync(filePath).isDirectory()

export const isFile = filePath => fs.statSync(filePath).isFile()

export const getFilesAndDirs = dir => {
  const results = fs.readdirSync(dir)

  const files = results.filter(name => isFile(joinPaths(dir, name)))
  const dirs = results.filter(name => isDir(joinPaths(dir, name)))

  return [files, dirs]
}

export function recursiveList(
  pathFrom,
  pathTo,
  processFiles,
  onList = () => {},
) {
  onList(pathFrom, pathTo)

  const [files, dirs] = getFilesAndDirs(pathFrom)

  processFiles(files, pathFrom, pathTo)

  dirs.forEach(dir =>
    recursiveList(
      joinPaths(pathFrom, dir),
      joinPaths(pathTo, dir),
      processFiles,
      onList,
    ),
  )
}
