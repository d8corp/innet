import { queueNanotask } from 'queue-nano-task'

import { HOOK } from './constants'
import { type Handler } from './types'

let currentHandler: Handler
let currentApp: unknown

export function useHandler<H extends Handler> (): H {
  return currentHandler as H
}

export function useApp<A> (): A {
  return currentApp as A
}

export function net<F extends (...a: any[]) => any> (hook: F, app: unknown, handler: Handler = currentHandler): ReturnType<F> {
  const prevApp = currentApp
  const prevHandler = currentHandler
  currentApp = app
  currentHandler = handler
  const result = hook()
  currentApp = prevApp
  currentHandler = prevHandler
  return result
}

export function innet (app: unknown, handler: Handler = currentHandler, priority = 0, force?: boolean) {
  const hook = handler[HOOK]()

  queueNanotask(net.bind(handler, hook, app, handler), priority, force)
}
