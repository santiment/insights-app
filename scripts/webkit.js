const path = require('path')
const fs = require('fs')
const { forFile, mkdir } = require('san-webkit/scripts/utils')

const LIB = path.resolve('node_modules/san-webkit/lib')
const STATIC = path.resolve('static/webkit')
const webkitMap = (dir) => path.resolve(LIB, dir) + '/**/*.svg'

forFile(['icons', 'illus', 'sprites'].map(webkitMap), async (file) => {
  const filePath = file.replace(LIB, '')
  const outPath = STATIC + filePath
  const fileName = path.basename(filePath)

  mkdir(outPath.replace(fileName, ''))

  fs.copyFileSync(file, outPath)
})

forFile(
  [path.resolve(LIB, 'styles/*.css'), path.resolve(LIB, 'fonts/*.*')],
  async (file) => {
    const filePath = file.replace(LIB, '')
    const outPath = STATIC + filePath
    const fileName = path.basename(filePath)

    mkdir(outPath.replace(fileName, ''))

    fs.copyFileSync(file, outPath)
  },
)

console.log('⚙ san-webkit is ready to use')
