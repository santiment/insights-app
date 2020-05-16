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
import json from 'rollup-plugin-json'
import sass from 'node-sass'
import postcss from 'postcss'
import pkg from './package.json'
import cssModules from 'postcss-modules'
import rollPostcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
const { createPreprocess } = require('./scripts/preprocess')
const { prepareIcons } = require('./scripts/icons')

prepareIcons()

const dedupe = (importee) =>
  importee === 'svelte' || importee.startsWith('svelte/')

const ALIASES = {
  '@': path.resolve(__dirname, 'src/'),
  resolve: ['.svelte', '.js'],
}
const preprocess = createPreprocess(ALIASES['@'])

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

sass.render(
  {
    file: './src/main.scss',
    outFile: './static/global.css',
  },
  function (error, result) {
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
        .then((result) => {
          fs.writeFile('./static/global.css', result.css, function (err) {
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
            'useState',
            'useEffect',
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
