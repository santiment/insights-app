const svelte = require('svelte/compiler')
import autoPreprocess, {
  scss,
  postcss as sveltePostcss,
} from 'svelte-preprocess'
import fs from 'fs'
import cssModules from 'postcss-modules'
import { recursiveList, getPath, joinPaths, getFilesAndDirs } from './utils'

const LIB_PATH = getPath('lib')
const COMMETS_PATH = joinPaths(LIB_PATH, 'components', 'comments')

const { style } = scss()

export const createPreprocess = basedir => ({
  ...autoPreprocess({
    postcss: false,
    coffeescript: false,
    typescript: false,
    less: false,
    stylus: false,
    pug: {
      basedir,
    },
  }),
  style: code => {
    if (code.attributes.lang !== 'scss') return { code: code.content }

    code.content = code.content.replace(
      /@import\s*("|')@\//g,
      `@import $1${basedir}/`,
    )

    return style(code).then(css => {
      return sveltePostcss({
        plugins: [
          cssModules({
            scopeBehaviour: 'global',
          }),
        ],
      })
        .style({ content: css.code })
        .then(postcss => {
          css.code = postcss.code

          return css
        })
    })
  },
})

const preprocess = createPreprocess(LIB_PATH)

function moveMixins() {
  const pathFrom = getPath('src')
  const file = 'mixins.scss'
  fs.copyFileSync(joinPaths(pathFrom, file), joinPaths(LIB_PATH, file))
}

const onlySvelteExt = file => file.includes('.svelte')

export function preprocessSvelte() {
  moveMixins()

  recursiveList(LIB_PATH, LIB_PATH, (files, newPath) => {
    let processedFiles = 0

    files.filter(onlySvelteExt).forEach(filename => {
      const filePath = joinPaths(newPath, filename)
      const source = fs.readFileSync(filePath, 'utf8')

      svelte
        .preprocess(source, preprocess, {
          filename,
        })
        .then(({ code }) =>
          fs.writeFile(filePath, code, 'utf8', () => {
            processedFiles += 1
            if (processedFiles === files.length) {
              console.log('Svelte files were preprocessed!')
            }
          }),
        )
    })
  })
}
