import fs from 'fs'
import path from 'path'
import glob from 'glob'
import mkdirp from 'mkdirp'
import SVGSpriter from 'svg-sprite'

const SPRITE_OPTIONS = {
  mode: {
    symbol: {
      example: false,
    },
  },
  shape: {
    transform: [
      {
        svgo: {
          plugins: [
            { removeXMLNS: true },
            { removeAttrs: { attrs: ['fill'] } },
          ],
        },
      },
    ],
  },
}

const GLOB_OPTIONS = {
  nodir: true,
}

const ICONS_PATH_FROM = path.resolve(__dirname, 'src', 'ui', 'icons')
const ICONS_PATH_TO = path.resolve(__dirname, 'static', 'san-icons')

export function prepareIcons(
  pathFrom = ICONS_PATH_FROM,
  pathTo = ICONS_PATH_TO,
) {
  glob(pathFrom + '/*.svg', GLOB_OPTIONS, (er, files) => {
    mkdirp.sync(pathTo)

    files.forEach(file => {
      const spriter = new SVGSpriter(SPRITE_OPTIONS)

      const fileName = file.slice(file.lastIndexOf('/') + 1)

      spriter.add(
        path.resolve(file),
        fileName,
        fs.readFileSync(file, { encoding: 'utf-8' }),
      )

      spriter.compile((error, result, data) => {
        fs.writeFileSync(pathTo + `/${fileName}`, result.symbol.sprite.contents)
      })
    })

    console.log('Icons copied to the ' + pathTo)
  })
}
