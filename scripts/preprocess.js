const svelte = require('svelte/compiler')
const autoPreprocess = require('svelte-preprocess')
const { scss, postcss: sveltePostcss } = require('svelte-preprocess')
const fs = require('fs')
const cssModules = require('postcss-modules')
const {
  recursiveList,
  getPath,
  joinPaths,
  getFilesAndDirs,
} = require('./utils')

const ROOT = getPath('..')
const LIB = joinPaths(ROOT, 'lib')
const SRC = joinPaths(ROOT, 'src')

const COMMETS_PATH = joinPaths(LIB, 'components', 'comments')

const { style } = scss()

const createPreprocess = basedir => {
  const config = {
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
  }

  if (basedir === LIB) {
    config.script = code => {
      code.content = code.content.replace(
        /from\s*("|')@\//g,
        `from $1${basedir}/`,
      )

      return { code: code.content }
    }

    const markupPug = config.markup

    config.markup = code =>
      markupPug(code).then(res => {
        res.code = changeIcons(res.code)
        return res
      })
  }

  return config
}

const preprocess = createPreprocess(LIB)

function moveMixins() {
  const pathFrom = SRC
  const file = 'mixins.scss'
  fs.copyFileSync(joinPaths(pathFrom, file), joinPaths(LIB, file))
}

const onlySvelteExt = file => file.includes('.svelte')

function preprocessSvelte() {
  moveMixins()

  recursiveList(LIB, LIB, (files, newPath) => {
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

function getNextHref(str) {
  const searchStr = 'href="/san-icons/'
  const startIndex = str.indexOf(searchStr)

  if (startIndex === -1) {
    return
  }

  const endIndex = str.indexOf('"', startIndex + searchStr.length)
  return str.slice(startIndex, endIndex + 1)
}

function getSvgNameFromHref(href) {
  return href.split('#')[1].slice(0, -1)
}

function changeIcons(source) {
  const importName = '__svgIcon_'
  const icons = []

  let result = source
  let href = getNextHref(result)

  while (href) {
    const iconName = getSvgNameFromHref(href)

    result = result.replace(href, `href="{${importName + icons.length}}"`)
    icons.push(iconName)

    href = getNextHref(result)
  }

  let imports = ''
  icons.forEach((name, i) => {
    imports += `
      import ${importName + i} from "${LIB}/icons/${name}.svg"`
  })

  if (imports) {
    result = result.replace('<script>', `<script> ${imports}`)
  }

  return result
}

module.exports = {
  createPreprocess,
  preprocessSvelte,
}
