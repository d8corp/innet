import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'
import glob from 'glob'

const input = glob.sync('{src/index.ts,src/**/index.ts}')

export default [{
  input,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.main.replace('index', ''),
    format: 'cjs',
    preserveModules: true
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    })
  ]
}, {
  input,
  output: {
    dir: 'lib',
    entryFileNames: '[name]' + pkg.module.replace('index', ''),
    format: 'es',
    preserveModules: true
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          target: 'es6',
        }
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
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    })
  ]
}]
