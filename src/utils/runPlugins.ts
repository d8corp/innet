import { NEXT, PLUGINS } from '../constants'
import { type Handler } from '../types'

let currentHandler: Handler
let currentApp: unknown

export function useHandler<H extends Handler> (): H {
  return currentHandler as H
}

export function useApp<A> (): A {
  return currentApp as A
}

export function runPlugins (app: unknown, handler: Handler, plugins = handler[PLUGINS]) {
  currentApp = app
  currentHandler = handler

  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i]() !== NEXT) return
  }
}
