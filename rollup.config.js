import fs from 'fs'
import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import alias from 'rollup-plugin-alias'
import config from 'sapper/config/rollup.js'
import autoPreprocess, {
  scss,
  pug,
  postcss as sveltePostcss,
} from 'svelte-preprocess'
import json from 'rollup-plugin-json'
import sass from 'node-sass'
import postcss from 'postcss'
import pkg from './package.json'
import cssModules from 'postcss-modules'
import rollPostcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import SVGSpriter from 'svg-sprite'
import mkdirp from 'mkdirp'
import glob from 'glob'

const dedupe = importee =>
  importee === 'svelte' || importee.startsWith('svelte/')

const ALIASES = {
  '@': path.resolve(__dirname, 'src/'),
  resolve: ['.svelte', '.js'],
}

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const { style } = scss()
const { markup } = pug()

glob('src/ui/icons/*.svg', null, (er, files) => {
  mkdirp.sync('static/san-icons/')

  files.forEach(file => {
    const spriter = new SVGSpriter({
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
    })

    const fileName = file.slice(file.lastIndexOf('/') + 1)

    spriter.add(
      path.resolve(file),
      fileName,
      fs.readFileSync(file, { encoding: 'utf-8' }),
    )

    spriter.compile((error, result, data) => {
      fs.writeFileSync(
        `static/san-icons/${fileName}`,
        result.symbol.sprite.contents,
      )
    })
  })
})

const preprocess = {
  ...autoPreprocess({
    postcss: false,
    coffeescript: false,
    typescript: false,
    less: false,
    stylus: false,
    pug: {
      basedir: ALIASES['@'],
    },
  }),
  style: code => {
    if (code.attributes.lang !== 'scss') return { code: code.content }

    code.content = code.content.replace(
      /@import\s*("|')@\//g,
      `@import $1${ALIASES['@']}/`,
    )

    return style(code).then(css => {
      return sveltePostcss({
        plugins: [
          cssModules({
            scopeBehaviour: 'global',
          }),
          /* cssnano(), */
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

sass.render(
  {
    file: './src/main.scss',
    outFile: './static/global.css',
  },
  function(error, result) {
    if (!error) {
      postcss([
        cssModules({
          generateScopedName: '[local]',
        }),
        cssnano(),
      ])
        .process(result.css, {
          from: './static/global.css',
          to: './static/global.css',
        })
        .then(result => {
          fs.writeFile('./static/global.css', result.css, function(err) {
            if (!err) {
            }
          })
        })
    }
  },
)

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      json(),
      alias(ALIASES),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(
          dev ? 'development' : 'production',
        ),
        'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
      }),
      rollPostcss({
        extensions: ['.scss'],
        modules: true,
      }),
      svelte({
        preprocess,
        dev,
        hydratable: true,
        emitCss: true,
      }),
      babel({
        extensions: ['.js'],
        exclude: ['node_modules/**'],
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-class-properties',
          '@babel/plugin-transform-classes',
        ],
      }),
      resolve({
        browser: true,
        dedupe,
      }),
      commonjs({
        namedExports: {
          'node_modules/draft-js/lib/Draft.js': [
            'convertToRaw',
            'CharacterMetadata',
            'ContentBlock',
            'Entity',
            'BlockMapBuilder',
            'genKey',
            'SelectionState',
            'ContentState',
          ],
          'node_modules/react-dom/index.js': ['findDOMNode'],
          'node_modules/react/index.js': [
            'createContext',
            'isValidElement',
            'cloneElement',
            'createElement',
            'Children',
            'Component',
          ],
          'node_modules/prop-types/index.js': [
            'object',
            'func',
            'node',
            'string',
            'bool',
            'number',
            'oneOfType',
            'arrayOf',
            'any',
          ],
          'node_modules/recharts-scale/lib/index.js': [
            'getNiceTickValues',
            'getTickValuesFixedDomain',
          ],
          'node_modules/react-is/index.js': ['isValidElementType'],
          'node_modules/immutable/dist/immutable.js': [
            'OrderedSet',
            'Map',
            'List',
          ],
        },
      }),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          runtimeHelpers: true,
          exclude: ['node_modules/**'],
          presets: [['@babel/preset-env', { targets: '>0.25%, not dead' }]],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-transform-runtime', { useESModules: true }],
          ],
        }),
      !dev && terser({ module: true }),
    ],
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      json(),
      alias(ALIASES),
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(
          dev ? 'development' : 'production',
        ),
        'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
      }),
      babel({
        extensions: ['.js'],
        exclude: ['node_modules/**'],
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-class-properties',
          '@babel/plugin-transform-classes',
        ],
      }),
      rollPostcss({
        extensions: ['.scss'],
      }),
      svelte({ generate: 'ssr', dev, preprocess }),
      resolve({
        dedupe,
      }),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives')),
    ),
  },
  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(
          dev ? 'development' : 'production',
        ),
        'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
      }),
      commonjs(),
      !dev && terser(),
    ],
  },
}
