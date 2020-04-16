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

const createPreprocess = (basedir) => {
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
    style: (code) => {
      if (code.attributes.lang !== 'scss') return { code: code.content }

      code.content = code.content.replace(
        /@import\s*("|')@\//g,
        `@import $1${basedir}/`,
      )

      return style(code).then((css) => {
        return sveltePostcss({
          plugins: [
            cssModules({
              getJSON: () => {},
              scopeBehaviour: 'global',
            }),
          ],
        })
          .style({ content: css.code })
          .then((postcss) => {
            css.code = postcss.code

            return css
          })
      })
    },
  }

  if (basedir === LIB) {
    config.script = (code) => {
      code.content = code.content.replace(
        /from\s*("|')@\//g,
        `from $1${basedir}/`,
      )

      return { code: code.content }
    }

    const markupPug = config.markup

    config.markup = (code) =>
      markupPug(code).then((res) => {
        res.code = changeIcons(res.code)
        return res
      })
  }

  return config
}

const preprocess = createPreprocess(LIB)

function moveScss() {
  const pathFrom = SRC
  const mixins = 'mixins.scss'
  fs.copyFileSync(joinPaths(pathFrom, mixins), joinPaths(LIB, mixins))

  const variables = 'variables.scss'
  fs.copyFileSync(joinPaths(pathFrom, variables), joinPaths(LIB, variables))
}

const onlySvelteExt = (file) => file.includes('.svelte')

function preprocessSvelte() {
  moveScss()

  recursiveList(LIB, LIB, (files, newPath) => {
    let processedFiles = 0

    files.filter(onlySvelteExt).forEach((filename) => {
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

function getNextOccurance(str, searchStr) {
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
  const searchStr = 'href="/san-icons/'

  let result = source
  let href = getNextOccurance(result, searchStr)

  while (href) {
    const iconName = getSvgNameFromHref(href)

    result = result.replace(
      href,
      `href="{${importName + icons.length}}#${iconName}"`,
    )
    icons.push(iconName)

    href = getNextOccurance(result, searchStr)
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

function makeStaticIconsImported() {
  const staticsPath = joinPaths(LIB, 'static')

  let statics

  recursiveList(
    staticsPath,
    staticsPath,
    (files) => {
      statics = [...files]
    },
    undefined,
    0,
  )

  const importName = '__staticImpr_'

  recursiveList(
    LIB,
    LIB,
    (files, newPath) => {
      files.filter(onlySvelteExt).forEach((filename) => {
        const filePath = joinPaths(newPath, filename)
        let source = fs.readFileSync(filePath, 'utf8')
        let wasModified = false
        const imports = []

        statics.forEach((staticFile) => {
          const length = staticFile.length + 2
          let isInStyles = false
          let startIndex = findInQuotesIndex(source, staticFile)
          // Disable style replace for now
          /* if (startIndex === -1) {
           *   startIndex = findInQuotesIndex(source, '/' + staticFile)
           *   isInStyles = startIndex > -1
           * } */

          while (startIndex !== -1) {
            if (isInStyles) {
              const match = source.slice(startIndex, startIndex + 1 + length)
              source = source.replace(match, `"${staticsPath}/${staticFile}"`)
            } else {
              const match = source.slice(startIndex, startIndex + length)
              source = source.replace(match, importName + imports.length)
              imports.push(match.slice(1, -1))
            }
            wasModified = true
            startIndex = findInQuotesIndex(source, staticFile)
          }
        })

        if (wasModified === false) {
          return
        }

        let statements = ''
        imports.forEach((name, i) => {
          statements += `
      import ${importName + i} from "${staticsPath}/${name}"`
        })

        source = source.replace('<script>', `<script> ${statements}`)
        fs.writeFileSync(filePath, source, 'utf8')

        console.log('Static imports updated')
      })
    },
    undefined,
  )
}

function findInQuotesIndex(str, target) {
  let res = str.indexOf(`'${target}'`)

  if (res === -1) {
    res = str.indexOf(`"${target}"`)
  }

  return res
}

module.exports = {
  createPreprocess,
  preprocessSvelte,
  makeStaticIconsImported,
}
