const svelte = require('svelte/compiler')
const sveltePreprocess = require('svelte-preprocess')
const cssModules = require('svelte-preprocess-cssmodules')
const fs = require('fs')
const path = require('path')
const { forFile, mkdir } = require('san-webkit/scripts/utils')

const ROOT = path.resolve(__dirname, '..')
const LIB = path.resolve(ROOT, 'lib')
const SRC = path.resolve(ROOT, 'src')

const BABEL_PREPROCESS = {
  assumptions: {
    noDocumentAll: true,
  },
  plugins: ['@babel/plugin-proposal-optional-chaining'],
}
const preprocess = sveltePreprocess({ babel: BABEL_PREPROCESS })

const routesPreprocess = {
  script: ({ content, filename }) => {
    return {
      code: replaceModuleAliases(content, filename),
    }
  },
}

const ROUTE_REGEX = /from '@\//g
const IMPORT_REGEX = /import '@\//g
const DYN_IMPORT_REGEX = /import\('@\//g
function replaceModuleAliases(fileContent, srcFilePath) {
  const diff = path.relative(srcFilePath, SRC).replace('..', '.')

  return fileContent
    .replace(ROUTE_REGEX, `from '${diff}/`)
    .replace(IMPORT_REGEX, `import '${diff}/`)
    .replace(DYN_IMPORT_REGEX, `import('${diff}/`)
    .replace(/from 'san-chart/g, "from '@santiment-network/chart")
    .replace(/from 'webkit/g, "from 'san-webkit/lib")
    .replace(/from '@cmp\//g, `from '${diff}/components/`)
}

async function processSvelte() {
  forFile(['src/**/*.svelte'], async (entry) => {
    const absolutePath = path.resolve(entry)
    const file = fs.readFileSync(absolutePath)

    const { code } = await svelte.preprocess(
      file.toString(),
      [cssModules(), preprocess, routesPreprocess],
      { filename: absolutePath },
    )

    const libFilePath = path.resolve(LIB, entry.slice('src/'.length))
    const libDirPath = path.dirname(libFilePath)
    mkdir(libDirPath)

    fs.writeFileSync(libFilePath, code)
  })

  forFile(['src/**/*.svg', 'src/**/*.png'], async (entry) => {
    const absolutePath = path.resolve(entry)
    const file = fs.readFileSync(absolutePath)
    const libFilePath = path.resolve(LIB, entry.slice('src/'.length))
    fs.writeFileSync(libFilePath, file)
  })
}

function processJs() {
  forFile(['src/**/*.js'], async (entry) => {
    const absolutePath = path.resolve(entry)
    const file = fs.readFileSync(absolutePath)

    const libFilePath = path.resolve(LIB, entry.slice('src/'.length))
    const libDirPath = path.dirname(libFilePath)
    mkdir(libDirPath)

    fs.writeFileSync(libFilePath, replaceModuleAliases(file.toString(), absolutePath))
  })
}

function main() {
  fs.rmdirSync(LIB, { recursive: true })
  processJs()
  processSvelte()
}
main()

module.exports = {
  processSvelte,
}
