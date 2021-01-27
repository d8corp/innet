import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'

const input = {
  index: 'src/index.ts',
  'Context/index': 'src/Context/index.ts',
  'Context/Context': 'src/Context/Context.ts',
  'utils/dom/index': 'src/utils/dom/index.ts',
  'utils/dom/dom': 'src/utils/dom/dom.ts',
  'utils/test/getHTML': 'src/utils/test/getHTML.ts',
  'utils/test/renderElement': 'src/utils/test/renderElement.ts',
  'Ref/index': 'src/Ref/index.ts',
  'Ref/Ref': 'src/Ref/Ref.ts',
  'scope/index': 'src/scope/index.ts',
  'scope/scope': 'src/scope/scope.ts',
}

export default [{
  input,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.main.replace('index', ''),
    format: 'cjs'
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext'
        },
        include: [
          'index.ts'
        ]
      }
    })
  ]
}, {
  input,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.module.replace('index', ''),
    format: 'es'
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          target: 'es6',
          module: 'esnext'
        },
        include: [
          'index.ts'
        ]
      }
    })
  ]
}, {
  input: 'src/innet.min.ts',
  output: {
    file: 'lib/innet.min.js',
    format: 'iife',
    name: 'innet',
    plugins: [terser()]
  },
  plugins: [
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext'
        },
        include: [
          'index.ts'
        ]
      }
    })
  ]
}]
